import type { ComponentProps, ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";

const control =
  "w-full rounded-2xl bg-surface px-5 text-lg text-night ring-1 ring-line transition-shadow duration-200 placeholder:text-muted/70 hover:ring-night/30 focus:ring-2 focus:ring-night focus:outline-none aria-invalid:ring-2 aria-invalid:ring-primary-ink";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2.5 flex items-center gap-2 text-sm font-bold text-primary-ink">
      <span aria-hidden="true" className="size-2 shrink-0 bg-primary" />
      {children}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 flex items-baseline gap-2 font-bold text-night">
      {children}
      {optional && <span className="text-sm font-medium text-muted">Optional</span>}
    </label>
  );
}

type TextFieldProps = Omit<ComponentProps<"input">, "onChange" | "value"> & {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  optional?: boolean;
};

export function TextField({ id, label, value, onValueChange, error, optional, ...props }: TextFieldProps) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} h-14`}
        {...props}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

type TextAreaProps = Omit<ComponentProps<"textarea">, "onChange" | "value"> & {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
};

export function TextAreaField({ id, label, value, onValueChange, error, maxLength, ...props }: TextAreaProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onValueChange(event.target.value)}
        // Ctrl/Cmd + Enter moves on, since plain Enter adds a new line here.
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) event.currentTarget.form?.requestSubmit();
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-count${error ? ` ${id}-error` : ""}`}
        className={`${control} min-h-40 resize-y py-4 leading-relaxed`}
        {...props}
      />
      <div className="flex items-start justify-between gap-4">
        <FieldError id={`${id}-error`}>{error}</FieldError>
        {maxLength && (
          <p id={`${id}-count`} className="mt-2.5 ml-auto shrink-0 text-sm text-muted">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

type SelectFieldProps = Omit<ComponentProps<"select">, "onChange" | "value"> & {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onValueChange: (value: string) => void;
  error?: string;
  optional?: boolean;
};

export function SelectField({ id, label, value, options, placeholder, onValueChange, error, optional, ...props }: SelectFieldProps) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${control} h-14 appearance-none pr-12 ${value ? "" : "text-muted/80"}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-night">
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-muted" />
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

type ChoiceGroupProps = {
  name: string;
  legend: string;
  options: readonly string[];
  error?: string;
  columns?: 1 | 2;
} & (
  | { multiple: true; value: string[]; onValueChange: (value: string[]) => void }
  | { multiple?: false; value: string; onValueChange: (value: string) => void }
);

// Big tappable option cards backed by real radio buttons / checkboxes.
export function ChoiceGroup(props: ChoiceGroupProps) {
  const { name, legend, options, error, columns = 2 } = props;
  const isChecked = (option: string) => (props.multiple ? props.value.includes(option) : props.value === option);

  const toggle = (option: string) => {
    if (props.multiple) {
      props.onValueChange(
        props.value.includes(option) ? props.value.filter((item) => item !== option) : [...props.value, option],
      );
    } else {
      props.onValueChange(option);
    }
  };

  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2.5 font-bold text-night">{legend}</legend>
      <div className={`grid gap-2.5 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {options.map((option) => {
          const checked = isChecked(option);
          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 transition-[box-shadow,background-color] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
                checked ? "bg-sun-tint ring-2 ring-night" : "ring-1 ring-line hover:ring-night/30"
              }`}
            >
              <input
                type={props.multiple ? "checkbox" : "radio"}
                name={name}
                value={option}
                checked={checked}
                onChange={() => toggle(option)}
                aria-invalid={error ? true : undefined}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-5 shrink-0 place-items-center transition-colors duration-200 ${
                  props.multiple ? "rounded-md" : "rounded-full"
                } ${checked ? "bg-primary text-primary-foreground" : "ring-1 ring-night/30"}`}
              >
                {checked && <CheckIcon className="size-3" />}
              </span>
              <span className="font-medium text-night">{option}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`}>{error}</FieldError>
    </fieldset>
  );
}

type CheckboxFieldProps = {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
};

export function CheckboxField({ id, checked, onCheckedChange, children, error }: CheckboxFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-2xl bg-surface p-4 transition-shadow duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
          checked ? "ring-2 ring-night" : "ring-1 ring-line hover:ring-night/30"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md transition-colors duration-200 ${
            checked ? "bg-primary text-primary-foreground" : "ring-1 ring-night/30"
          }`}
        >
          {checked && <CheckIcon className="size-3" />}
        </span>
        <span className="text-[0.9375rem] text-night">{children}</span>
      </label>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}
