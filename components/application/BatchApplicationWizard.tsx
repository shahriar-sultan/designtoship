"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormQuestionCard } from "@/components/application/FormQuestionCard";
import { FormSectionHeader } from "@/components/application/FormSectionHeader";
import { FormWizardNav } from "@/components/application/FormWizardNav";
import { RadioOptionGroup } from "@/components/application/RadioOptionGroup";
import {
  batchApplicationSteps,
  type BatchApplicationInput,
} from "@/lib/bff/two-gate-registration/schemas/batchApplication";
import {
  CURRENT_STATUS_OPTIONS,
  EDUCATION_OPTIONS,
  ENGLISH_COMFORT_OPTIONS,
  EMPTY_BATCH_FORM,
  FIGMA_OPTIONS,
  LAPTOP_OPTIONS,
  SECTION_TITLES,
  WEBSITE_OPTIONS,
  clearFormDraft,
  loadFormDraft,
  saveFormDraft,
  type BatchFormConfig,
} from "@/lib/application/batchForm";
import { BANGLADESH_DISTRICTS } from "@/lib/bff/two-gate-registration/constants/districts";
import Loading from "@/components/Loading";

const TOTAL_STEPS = 5;

function fieldErrorsFromZod(
  result: { success: false; error: { issues: Array<{ path: PropertyKey[]; message: string }> } },
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function BatchApplicationWizard() {
  const [config, setConfig] = useState<BatchFormConfig | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BatchApplicationInput>(EMPTY_BATCH_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/applications/batch-4")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load form configuration");
        setConfig(json.data);
        const draft = loadFormDraft();
        const base = draft ?? EMPTY_BATCH_FORM;
        setForm({
          ...base,
          paymentTier: json.data.expectedPaymentTier,
          district:
            BANGLADESH_DISTRICTS.includes(
              base.district as (typeof BANGLADESH_DISTRICTS)[number],
            )
              ? (base.district as BatchApplicationInput["district"])
              : BANGLADESH_DISTRICTS[12],
        });
      })
      .catch((e) =>
        setConfigError(e instanceof Error ? e.message : "Failed to load form"),
      );
  }, []);

  const updateField = useCallback(
    <K extends keyof BatchApplicationInput>(key: K, value: BatchApplicationInput[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        saveFormDraft(next);
        return next;
      });
      setFieldErrors((prev) => {
        if (!prev[key as string]) return prev;
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    },
    [],
  );

  const validateStep = (currentStep: number) => {
    const schema = batchApplicationSteps[currentStep - 1];
    const result = schema.safeParse(form);
    if (!result.success) {
      setFieldErrors(fieldErrorsFromZod(result));
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClear = () => {
    if (!window.confirm("Clear all form data?")) return;
    clearFormDraft();
    setForm({
      ...EMPTY_BATCH_FORM,
      paymentTier: config?.expectedPaymentTier ?? "EARLY_BIRD",
      district: BANGLADESH_DISTRICTS[12],
    });
    setFieldErrors({});
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setSubmitError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/applications/batch-4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(json.error ?? "Submission failed. Please try again.");
        return;
      }
      clearFormDraft();
      setSuccess(true);
    } catch {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  if (configError) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Application unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{configError}</p>
        </CardContent>
      </Card>
    );
  }

  if (!config) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Application submitted</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Thank you for applying. Please check your email to verify your address.
            After verification, your application will await administrator approval.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Go to login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const pricingOptions = config.pricing.map((tier) => ({
    value: tier.id,
    label: tier.labelBn,
  }));

  const isRegularPricing = config.expectedPaymentTier === "REGULAR";

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pb-10">
      {/* Header card */}
      <Card className="overflow-hidden pt-0 gap-0">
        <div className="h-2 bg-secondary" />
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            {config.title} | {config.titleBn}
          </CardTitle>
          <div className="text-sm text-muted-foreground space-y-2 pt-2">
            <p>
              <strong>শুরু:</strong> {config.courseStart} · <strong>সময়:</strong>{" "}
              {config.schedule}
            </p>
            <p>
              <strong>মেয়াদ:</strong> {config.duration}
            </p>
            <div className="rounded-md border bg-muted/40 p-3 text-xs leading-relaxed">
              <p className="font-medium mb-1">পেমেন্ট নির্দেশনা</p>
              <p>
                ফর্ম পূরণের আগে পেমেন্ট সম্পন্ন করুন। bKash Personal:{" "}
                <strong>{config.bkashNumber}</strong>
              </p>
              <p className="mt-1">
                bKash পে করুন → Transaction ID কপি করুন → ফর্মে সঠিক ID দিন →
                WhatsApp কনফার্মেশনের জন্য অপেক্ষা করুন।
              </p>
              <p className="mt-1 text-destructive/90">
                Transaction ID ছাড়া রেজিস্ট্রেশন বৈধ হবে না।
              </p>
            </div>
            <p className="text-xs">
              <span className="text-destructive">*</span> Indicates required question
            </p>
          </div>
        </CardHeader>
      </Card>

      <FormSectionHeader title={SECTION_TITLES[step - 1]} />

      {/* Step 1 — Contact */}
      {step === 1 && (
        <div className="space-y-3">
          <FormQuestionCard label="Email" required error={fieldErrors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!fieldErrors.email}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="পূর্ণ নাম (Full Name)"
            required
            error={fieldErrors.fullName}
          >
            <Input
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Your answer"
              aria-invalid={!!fieldErrors.fullName}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="WhatsApp নম্বর (WhatsApp Number)"
            required
            error={fieldErrors.whatsappNumber}
          >
            <Input
              value={form.whatsappNumber}
              onChange={(e) => updateField("whatsappNumber", e.target.value)}
              placeholder="01XXXXXXXXX"
              aria-invalid={!!fieldErrors.whatsappNumber}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="Facebook প্রোফাইল লিংক (Facebook Profile Link)"
            required
            error={fieldErrors.facebookProfileLink}
          >
            <Input
              value={form.facebookProfileLink}
              onChange={(e) => updateField("facebookProfileLink", e.target.value)}
              placeholder="https://facebook.com/..."
              aria-invalid={!!fieldErrors.facebookProfileLink}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="ইমেইল আইডি (Email ID)"
            required
            error={fieldErrors.emailId}
          >
            <Input
              type="email"
              value={form.emailId}
              onChange={(e) => updateField("emailId", e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!fieldErrors.emailId}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="বর্তমান জেলা (Current District)"
            required
            error={fieldErrors.district}
          >
            <Select
              value={form.district}
              onChange={(e) =>
                updateField(
                  "district",
                  e.target.value as BatchApplicationInput["district"],
                )
              }
              aria-invalid={!!fieldErrors.district}
            >
              {config.districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </FormQuestionCard>
          <FormQuestionCard
            label="বর্তমান অবস্থা (Current Status)"
            required
            error={fieldErrors.currentStatus}
          >
            <RadioOptionGroup
              name="currentStatus"
              value={form.currentStatus}
              options={[...CURRENT_STATUS_OPTIONS]}
              onChange={(v) => updateField("currentStatus", v as BatchApplicationInput["currentStatus"])}
              aria-invalid={!!fieldErrors.currentStatus}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="শিক্ষাগত যোগ্যতা (Educational Qualification)"
            required
            error={fieldErrors.education}
          >
            <RadioOptionGroup
              name="education"
              value={form.education}
              options={[...EDUCATION_OPTIONS]}
              onChange={(v) => updateField("education", v as BatchApplicationInput["education"])}
              aria-invalid={!!fieldErrors.education}
            />
          </FormQuestionCard>
        </div>
      )}

      {/* Step 2 — Payment */}
      {step === 2 && (
        <div className="space-y-3">
          {isRegularPricing && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              মনে রাখবেন: Early Bird সময়সীমা শেষ — Regular মূল্য প্রযোজ্য।
            </div>
          )}
          <FormQuestionCard
            label="bKash Transaction ID"
            description="আপনার bKash পেমেন্টের Transaction ID এখানে লিখুন। এটি ছাড়া রেজিস্ট্রেশন নিশ্চিত করা সম্ভব হবে না।"
            required
            error={fieldErrors.bkashTransactionId}
          >
            <Input
              value={form.bkashTransactionId}
              onChange={(e) => updateField("bkashTransactionId", e.target.value)}
              placeholder="Your answer"
              aria-invalid={!!fieldErrors.bkashTransactionId}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="আপনি কত টাকা পেমেন্ট করেছেন? (Payment Amount)"
            required
            error={fieldErrors.paymentTier}
          >
            <RadioOptionGroup
              name="paymentTier"
              value={form.paymentTier}
              options={pricingOptions}
              onChange={(v) => updateField("paymentTier", v as BatchApplicationInput["paymentTier"])}
              aria-invalid={!!fieldErrors.paymentTier}
            />
          </FormQuestionCard>
        </div>
      )}

      {/* Step 3 — Skills */}
      {step === 3 && (
        <div className="space-y-3">
          <FormQuestionCard
            label="আপনি কি আগে কখনো Figma ব্যবহার করেছেন?"
            required
            error={fieldErrors.figmaExperience}
          >
            <RadioOptionGroup
              name="figmaExperience"
              value={form.figmaExperience}
              options={[...FIGMA_OPTIONS]}
              onChange={(v) => updateField("figmaExperience", v as BatchApplicationInput["figmaExperience"])}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="আপনি কি আগে কখনো ওয়েবসাইট বানানোর চেষ্টা করেছেন?"
            required
            error={fieldErrors.websiteExperience}
          >
            <RadioOptionGroup
              name="websiteExperience"
              value={form.websiteExperience}
              options={[...WEBSITE_OPTIONS]}
              onChange={(v) => updateField("websiteExperience", v as BatchApplicationInput["websiteExperience"])}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="ইংরেজিতে টুলস ব্যবহার করতে কতটা স্বাচ্ছন্দ্য বোধ করেন?"
            required
            error={fieldErrors.englishComfort}
          >
            <RadioOptionGroup
              name="englishComfort"
              value={form.englishComfort}
              options={[...ENGLISH_COMFORT_OPTIONS]}
              onChange={(v) => updateField("englishComfort", v as BatchApplicationInput["englishComfort"])}
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="আপনার কি নিজের ল্যাপটপ আছে?"
            required
            error={fieldErrors.laptopAvailability}
          >
            <RadioOptionGroup
              name="laptopAvailability"
              value={form.laptopAvailability}
              options={[...LAPTOP_OPTIONS]}
              onChange={(v) => updateField("laptopAvailability", v as BatchApplicationInput["laptopAvailability"])}
            />
          </FormQuestionCard>
        </div>
      )}

      {/* Step 4 — Motivation */}
      {step === 4 && (
        <div className="space-y-3">
          <FormQuestionCard
            label="আপনি কেন UI/UX ডিজাইন শিখতে চান? সংক্ষেপে লিখুন।"
            required
            error={fieldErrors.whyLearnUiUx}
          >
            <Input
              value={form.whyLearnUiUx}
              onChange={(e) => updateField("whyLearnUiUx", e.target.value)}
              placeholder="Your answer"
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="কোর্স শেষ হওয়ার ৬ মাস পর আপনি কোথায় থাকতে চান?"
            required
            error={fieldErrors.goalAfterSixMonths}
          >
            <Input
              value={form.goalAfterSixMonths}
              onChange={(e) => updateField("goalAfterSixMonths", e.target.value)}
              placeholder="Your answer"
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="আপনি কি আগে অনলাইনে কোনো Skill শেখার চেষ্টা করেছেন? কী হয়েছিল?"
            required
            error={fieldErrors.onlineLearningExperience}
          >
            <Input
              value={form.onlineLearningExperience}
              onChange={(e) => updateField("onlineLearningExperience", e.target.value)}
              placeholder="Your answer"
            />
          </FormQuestionCard>
        </div>
      )}

      {/* Step 5 — Commitment */}
      {step === 5 && (
        <div className="space-y-3">
          <FormQuestionCard
            label="এই কোর্সটি ১৩ সপ্তাহ, সপ্তাহে ২টি ক্লাস, প্রতিটি প্রায় ৩ ঘণ্টা — এবং প্রতিটি ক্লাসের মাঝে অ্যাসাইনমেন্ট থাকবে। আপনার বর্তমান জীবনের সাথে এটি কীভাবে সামলাবেন?"
            required
            error={fieldErrors.scheduleCommitment}
          >
            <Textarea
              value={form.scheduleCommitment}
              onChange={(e) => updateField("scheduleCommitment", e.target.value)}
              placeholder="Your answer"
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="যদি কোনো কিছুতে ২ দিন ধরে আটকে থাকেন এবং বুঝতে না পারেন — তখন আপনি কী করেন?"
            required
            error={fieldErrors.stuckBehavior}
          >
            <Textarea
              value={form.stuckBehavior}
              onChange={(e) => updateField("stuckBehavior", e.target.value)}
              placeholder="Your answer"
            />
          </FormQuestionCard>
          <FormQuestionCard
            label="কেন আমরা এই ব্যাচে আপনাকে একটি সিট দেব? আপনি সিলেক্টেড না হলে আপনার পেমেন্ট রিফান্ড করা হবে।"
            required
            error={fieldErrors.whyGiveSeat}
          >
            <Textarea
              value={form.whyGiveSeat}
              onChange={(e) => updateField("whyGiveSeat", e.target.value)}
              placeholder="Your answer"
            />
          </FormQuestionCard>
        </div>
      )}

      {submitError && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {submitError}
        </p>
      )}

      <FormWizardNav
        step={step}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onClear={handleClear}
        isLoading={isLoading}
        isLastStep={step === TOTAL_STEPS}
      />
    </div>
  );
}
