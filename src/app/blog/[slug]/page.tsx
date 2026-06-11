import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/data/dmso-articles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

function SimpleMarkdown({ content }: { content: string }) {
    const lines = content.split('\n');
    return (
        <div className="space-y-6">
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (trimmed === '') return <div key={i} className="h-2" />;

                if (trimmed.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl md:text-3xl font-black text-primary mt-10 mb-6 tracking-tight">{trimmed.replace('## ', '')}</h2>;
                }

                if (trimmed.startsWith('- ')) {
                    const text = trimmed.replace('- ', '');
                    const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)/);
                    if (boldMatch) {
                        return (
                            <li key={i} className="list-none flex gap-3 ml-2 mb-3">
                                <div className="min-w-[6px] h-[6px] rounded-full bg-primary mt-2.5" />
                                <span className="text-on-surface-variant leading-relaxed">
                                    <strong className="text-on-surface font-bold">{boldMatch[1]}</strong>{boldMatch[2]}
                                </span>
                            </li>
                        );
                    }
                    return (
                        <li key={i} className="list-none flex gap-3 ml-2 mb-3">
                            <div className="min-w-[6px] h-[6px] rounded-full bg-primary mt-2.5" />
                            <span className="text-on-surface-variant leading-relaxed">{text}</span>
                        </li>
                    );
                }

                const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
                if (numMatch) {
                    return (
                        <div key={i} className="flex gap-4 ml-2 mb-4">
                            <span className="text-primary font-black text-lg">{numMatch[1]}.</span>
                            <span className="text-on-surface-variant leading-relaxed">{numMatch[2]}</span>
                        </div>
                    );
                }

                const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={i} className="text-on-surface-variant leading-relaxed text-lg font-body-sm">
                        {parts.map((part, pi) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pi} className="text-on-surface font-bold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                        })}
                    </p>
                );
            })}
        </div>
    );
}

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="container mx-auto px-6 py-12 max-w-4xl">
            <Breadcrumbs
                items={[
                    { label: 'Inicio', href: '/' },
                    { label: 'Blog', href: '/blog' },
                    { label: article.title.substring(0, 30) + '...' }
                ]}
            />

            <header className="mb-12 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-dmso-dark mb-8 leading-tight">{article.title}</h1>
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-video relative">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
                <SimpleMarkdown content={article.content} />
            </div>

            <div className="mt-16 bg-dmso-beige-mid/30 p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-dmso-dark mb-4">¿Te interesa probar el DMSO?</h3>
                <p className="mb-6 text-stone-600">Visita nuestra tienda y encuentra productos de la más alta pureza garantizada.</p>
                <Link href="/shop" className="inline-block bg-dmso-green text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors shadow-md">
                    Ir a la Tienda
                </Link>
            </div>
        </article>
    );
}
