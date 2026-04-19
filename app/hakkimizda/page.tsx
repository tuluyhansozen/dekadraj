import Image from "next/image";
import Link from "next/link";
import { getAllAuthors } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

export const metadata = {
  title: "Hakkımızda — Dekadraj",
  description: "Dekadraj Sinema Kolektifi hakkında.",
};

const EDITORIAL_BOARD = [
  "Deniz Üğütgen",
  "Feyzullah Ünnü",
  "Kerem Mazman",
];

interface Author {
  name: string;
  slug: string;
  bio?: string;
  photo?: { asset: { _ref: string } };
  role?: string;
}

function AuthorCard({
  author,
  isEditor,
  isGuest,
}: {
  author: Author;
  isEditor: boolean;
  isGuest: boolean;
}) {
  return (
    <Link
      href={`/yazarlar/${author.slug}`}
      className="group flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden bg-ink/5">
        {author.photo ? (
          <Image
            src={urlFor(author.photo).width(400).height(400).url()}
            alt={author.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ink/5">
            <span className="font-serif text-4xl text-ink/20 select-none">
              {author.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Role badge */}
        {isEditor && (
          <span className="absolute top-0 left-0 bg-action text-canvas font-sans text-xs font-medium tracking-wider uppercase px-3 py-1.5">
            Yayın Kurulu
          </span>
        )}
        {isGuest && (
          <span className="absolute top-0 left-0 bg-ink text-canvas font-sans text-xs font-medium tracking-wider uppercase px-3 py-1.5">
            Konuk Yazar
          </span>
        )}
      </div>

      {/* Info */}
      <div className="pt-5 space-y-2">
        <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-action transition-colors duration-300">
          {author.name}
        </h3>
        {author.bio && (
          <p className="font-sans text-sm text-meta leading-relaxed line-clamp-4">
            {author.bio}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function HakkimizdaPage() {
  const allAuthors: Author[] = await getAllAuthors();

  // Separate editorial board, regular writers, and guest writers
  const editors = allAuthors.filter(
    (a) => EDITORIAL_BOARD.includes(a.name) || a.role === "yayin-kurulu"
  );
  const guestWriters = allAuthors.filter(
    (a) =>
      !EDITORIAL_BOARD.includes(a.name) &&
      a.role !== "yayin-kurulu" &&
      a.role === "konuk-yazar"
  );
  const writers = allAuthors.filter(
    (a) =>
      !EDITORIAL_BOARD.includes(a.name) &&
      a.role !== "yayin-kurulu" &&
      a.role !== "konuk-yazar"
  );

  return (
    <div>
      {/* Manifesto */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-12 text-center">
          Dekadraj Sinema Kolektifi
        </h1>

        <div className="max-w-3xl mx-auto space-y-6 font-sans text-lg leading-relaxed text-ink/90">
          <p>
            Bugün Türkiye'de ve dünyada politika, ekonomi, kültür ve sinema
            alanlarında egemen düzenin; gençler, kadınlar, işçiler, queerler ve
            tüm ezilenler için kapsayıcı ve adil bir gelecek sunmadığının
            farkındayız. Bu nedenle sinemaya dair fikri ve üretimi olan biz genç
            sinemacılar ve sinema yazarları, sinemayı yalnızca anlatılan
            filmlerle değil, açtığı tartışmalar ve ürettiği karşı bakışlarla
            düşünmenin gerekli olduğuna inanıyoruz.
          </p>

          <p>
            Dekadraj olarak egemen ideoloji tarafından görünmez kılınan bağımsız,
            politik, deneysel, belgesel ve ticari olmayan sinemayı odağımıza
            alıyor; filmlere teknik, sanatsal, toplumsal, tarihsel, ekonomik ve
            felsefi boyutlarıyla, disiplinler arası bir perspektifle yaklaşıyoruz.
            Akademik bilgiyle gündelik dili buluşturmayı, sinema tartışmalarını
            erişilebilir kılarken derinliğinden ödün vermemeyi önemsiyoruz.
          </p>

          <p>
            Sinemaya dair yüzeysel tanıtımların ötesine geçerek sistemsel
            eleştiriler üretmeyi, güncel politik meselelerle sinema arasında bağ
            kurmayı ve bu çerçevede kamusal tartışma alanları açmayı
            hedefliyoruz. Sinemanın tarihini, endüstrisini ve toplumsal
            hafızasını yeniden düşünmenin; festivallerden dergilere, üretim
            ilişkilerinden devletle kurulan bağlara kadar bütünlüklü bir
            incelemenin gerektiğini düşünüyoruz.
          </p>

          <p>
            Dekadraj, sinemayı bireysel bir tüketim nesnesi olmaktan çıkarıp
            kolektif bir deneyim, tartışma ve üretim alanı olarak yeniden kurmayı
            amaçlar. Pandemi sonrası dönemde sinemanın dijitalleşme ile
            yalnızlaşmasına karşı; fiziksel buluşmalar, etkinlikler ve yüz yüze
            tartışmalarla hakiki bağlar kurmayı önemser.
          </p>

          <p>
            Kolektif üretimi, dayanışmayı ve bağımsız sinemayı destekleyen bir
            tavırla; kapitale bağımlı olmayan alternatif üretim ve paylaşım
            yollarını araştırır. Demokratik, eşit söz hakkına dayanan bir
            kolektif yapı içinde; sinemayı birlikte düşünen, üreten ve
            dönüştüren bir alan inşa etmeyi hedefler.
          </p>

          <p>
            Konformizmi reddeden, yeni bir bakış, yeni bir anlatım ve yeni bir
            biçim arayışındaki sinemacıların sözünü çoğaltmak için buradayız.
          </p>
        </div>

      </section>

      {/* Quote — red banner (mirrors home page ManifestoBreak) */}
      <section className="w-full bg-action py-32">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <blockquote className="font-serif italic text-4xl lg:text-5xl text-canvas leading-[1.3] mb-6">
            &ldquo;Konformist olmak istemeyen, dünyaya yepyeni bir bakış açısı,
            yeni bir anlatım, yeni bir biçim getirmek isteyen sinemacı&hellip;&rdquo;
          </blockquote>
          <p className="font-sans text-sm text-canvas opacity-70 uppercase tracking-wider">
            — Onat Kutlar
          </p>
        </div>
      </section>

      {/* Team (editors + writers combined) */}
      {(editors.length > 0 || writers.length > 0) && (
        <section className="max-w-[1400px] mx-auto px-8 py-24">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-ink mb-4">
            Ekibimiz
          </h2>
          <p className="font-sans text-meta mb-12 max-w-2xl">
            Kolektifin sesini oluşturan editörler ve yazarlar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[...editors, ...writers].map((author) => (
              <AuthorCard
                key={author.slug}
                author={author}
                isEditor={
                  EDITORIAL_BOARD.includes(author.name) ||
                  author.role === "yayin-kurulu"
                }
                isGuest={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Guest Writers */}
      {guestWriters.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-8 py-24">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-ink mb-4">
            Konuk Yazarlar
          </h2>
          <p className="font-sans text-meta mb-12 max-w-2xl">
            Dekadraj'a katkı sunan konuk yazarlarımız.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {guestWriters.map((author) => (
              <AuthorCard
                key={author.slug}
                author={author}
                isEditor={false}
                isGuest={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Fallback when no authors exist */}
      {allAuthors.length === 0 && (
        <section className="max-w-[1400px] mx-auto px-8 py-24">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-ink mb-12 text-center">
            Ekibimiz
          </h2>
          <p className="font-sans text-meta text-center">
            Yazar bilgileri yakında eklenecek.
          </p>
        </section>
      )}
    </div>
  );
}
