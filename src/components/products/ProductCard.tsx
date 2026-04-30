interface ProductCardProps {
    title: string;
    priceOrDesc: string;
    imageSrc: string;
}

export default function ProductCard({ title, priceOrDesc, imageSrc }: ProductCardProps) {
    return (
        <div className="group cursor-pointer">
            <div className="bg-white h-64 w-full rounded-lg mb-4 overflow-hidden flex items-center justify-center p-4 relative shadow-sm border border-gray-100">
                <img
                    alt={title}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    src={imageSrc}
                />
            </div>
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{priceOrDesc}</p>
        </div>
    );
}
