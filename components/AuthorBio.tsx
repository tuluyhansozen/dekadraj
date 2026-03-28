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
}

export function AuthorBio({ author }: AuthorBioProps) {
  if (!author) return null;

  return (
    <div className="mt-16 pt-8 border-t border-meta/20">
      <Link
        href={`/yazarlar/${author.slug}`}
        className="group flex items-start gap-6"
      >
        {/* Photo */}
        <div className="shrink-0 w-20 h-20 overflow-hidden bg-ink/5">
          {author.photo ? (
            <Image
              src={urlFor(author.photo).width(160).height(160).url()}
              alt={author.name}
              width={160}
              height={160}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-2xl text-ink/20 select-none">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-action transition-colors duration-300">
            {author.name}
          </h3>
          {author.bio ? (
            <p className="font-sans text-sm text-meta leading-relaxed line-clamp-3">
              {author.bio}
            </p>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
