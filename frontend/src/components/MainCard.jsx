export default function MainCard({
    title,
    description,
    onAction,
    icon: Icon,
    sidebarOpen,
}) {
    return (
        <div
            className={`
                card bg-base-100 shadow-xl ${sidebarOpen ? "w-85" : "w-100"} 
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                border border-base-200 rounded-2xl`}
        >
            <div className="card-body items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                    {Icon && <Icon className="text-4xl text-primary" />}
                </div>

                <h2 className="card-title text-lg font-bold text-base-content">
                    {title}
                </h2>

                <p className="text-sm text-base-content/70 leading-relaxed">
                    {description}
                </p>

                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary btn-sm px-6 rounded-full shadow-md hover:scale-105 transition-all">
                        {onAction}
                    </button>
                </div>
            </div>
        </div>
    );
}
