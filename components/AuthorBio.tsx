import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

interface AuthorBioProps {
  author?: {
    name: string;
    slug: string;
    bio?: string;
    photo?: { asset: { _ref: string } };
  };
  label?: string;
}

export function AuthorBio({ author, label }: AuthorBioProps) {
  if (!author) return null;

  return (
    <div className="mt-16 pt-8 border-t border-meta/20">
      {label ? (
        <p className="font-sans text-xs font-bold text-meta uppercase tracking-wider mb-4">
          {label}
        </p>
      ) : null}
      <Link
        href={`/yazarlar/${author.slug}`}
        className="group flex flex-col sm:flex-row items-start gap-6 sm:gap-8"
      >
        <div className="shrink-0 w-32 h-32 sm:w-36 sm:h-36 overflow-hidden bg-ink/5">
          {author.photo ? (
            <Image
              src={urlFor(author.photo).width(288).height(288).url()}
              alt={author.name}
              width={288}
              height={288}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-4xl text-ink/20 select-none">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 flex-1 min-w-0">
          <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-action transition-colors duration-300">
            {author.name}
          </h3>
          {author.bio ? (
            <p className="font-sans text-sm text-meta leading-relaxed whitespace-pre-line">
              {author.bio}
            </p>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
