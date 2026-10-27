import { BlockTitle } from "@/components/ui/block-title";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { IndexLabel } from "@/components/ui/index-label";
import { Tag } from "@/components/ui/tag";
import { values } from "@/content/our-story";

const number = (index: number) => String(index + 1).padStart(2, "0");

export function Values() {
  const last = values.items.length - 1;

  return (
    <section aria-labelledby="values-title" className="section-space relative isolate overflow-hidden border-t border-line bg-paper">
      <GridBackdrop />

      <div className="container-site">
        <Tag>{values.label}</Tag>
        <BlockTitle id="values-title" lead={values.title.lead} highlight={values.title.highlight} stagger fit className="mt-6 text-h1" />

        {/* 1 column on phones, 2 on tablets, 4 from 1024px. The last value is tinted, closing the row. */}
        <ol data-reveal="stagger" className="mt-12 grid gap-px border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((value, index) => (
            <li
              key={value.name}
              className={`flex min-h-64 flex-col p-6 sm:p-8 lg:min-h-80 ${index === last ? "bg-sun-tint" : "bg-surface"}`}
            >
              <IndexLabel index={number(index)} label={value.name} />
              <h3 className="mt-auto pt-12 text-h4 text-night">{value.title}</h3>
              <p className="mt-3 text-muted">{value.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
