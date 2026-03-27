import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          width={1200}
          height={675}
          className="w-full"
        />
        {value.caption ? (
          <figcaption className="font-sans text-sm text-meta mt-2 text-center">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: { href: string };
    }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-action underline hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableTextRenderer({ value }: { value: any }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink prose-p:leading-relaxed prose-a:text-action prose-blockquote:border-action prose-blockquote:text-ink prose-blockquote:italic">
      <PortableText value={value} components={components} />
    </div>
  );
}
