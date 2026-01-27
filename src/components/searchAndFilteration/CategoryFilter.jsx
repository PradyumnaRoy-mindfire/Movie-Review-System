function CategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = [
        { id: 'popular', name: 'Popular', icon: '🔥' },
        { id: 'top_rated', name: 'Top Rated', icon: '⭐' },
        { id: 'latest', name: 'Latest', icon: '🆕' }
    ];

    return (
        <div className="w-[85%] mb-8 ">
            <h2 className="text-2xl font-bold mb-4 text-white"> Filter by Categories</h2>
            <div className="flex gap-4">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all text-base border border-purple-400 ${
                            selectedCategory === category.id
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl transform scale-105'
                                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300  hover:from-gray-600 hover:to-gray-700'
                        }`}
                    >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;