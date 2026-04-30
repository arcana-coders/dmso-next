import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/data/dmso-articles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

// Simple Markdown Renderer for now since I don't want to force new deps right now
// unless user requested. I'll stick to a simple parser or just mapping lines.
// Actually, mapping lines manually is safer than adding deps mid-flow without asking.
function SimpleMarkdown({ content }: { content: string }) {
    const lines = content.split('\n');
    return (
        <div className="space-y-4">
            {lines.map((line, i) => {
                if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-dmso-green mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('- ')) {
                    const parts = line.replace('- ', '').split('**:');
                    if (parts.length > 1) {
                        return <li key={i} className="list-disc ml-5 mb-2"><strong className="text-dmso-dark">{parts[0].replace('**', '')}:</strong>{parts[1]}</li>
                    }
                    return <li key={i} className="list-disc ml-5 mb-2">{line.replace('- ', '')}</li>;
                }
                if (line.trim() === '') return null;
                return <p key={i} className="text-stone-700 leading-relaxed text-lg">{line}</p>;
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
                    { label: 'Todo sobre DMSO', href: '/dmso-facts' },
                    { label: article.title.substring(0, 30) + '...' }
                ]}
            />

            {/* Header */}
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

            {/* Content */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">
                <SimpleMarkdown content={article.content} />
            </div>

            {/* Footer CTA */}
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
