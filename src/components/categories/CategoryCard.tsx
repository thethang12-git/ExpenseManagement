import { Category } from "@/src/types/category";

export type CategoryCardProps = {
    category: Category;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    isSelected?: boolean;
};

export default function CategoryCard(props: CategoryCardProps) {
    const category = props.category;
    const onClick = props.onClick;
    const onEdit = props.onEdit;
    const onDelete = props.onDelete;
    const isSelected = props.isSelected === true;
    const isIncome = category.is_income;
    
    function getIconForCategory(categoryName: string): string {
        const name = categoryName.toLowerCase();
        if (name.includes("cho vay") || name.includes("lend")) {
            return "👛";
        }
        if (name.includes("trả nợ") || name.includes("pay debt")) {
            return "👛";
        }
        if (name.includes("đi vay") || name.includes("borrow")) {
            return "👛";
        }
        if (name.includes("thu nợ") || name.includes("collect debt")) {
            return "🤲";
        }
        if (name.includes("ăn uống") || name.includes("food") || name.includes("drink")) {
            return "🍹";
        }
        if (name.includes("nhà hàng") || name.includes("restaurant")) {
            return "🏠";
        }
        if (name.includes("cà phê") || name.includes("coffee")) {
            return "☕";
        }
        if (name.includes("hoá đơn") || name.includes("bill") || name.includes("tiện ích") || name.includes("utility")) {
            return "📄";
        }
        if (name.includes("điện thoại") || name.includes("phone")) {
            return "📞";
        }
        if (name.includes("nước") || name.includes("water")) {
            return "💧";
        }
        if (name.includes("điện") || name.includes("electric")) {
            return "⚡";
        }
        if (name.includes("gas")) {
            return "⛽";
        }
        if (name.includes("tv") || name.includes("television")) {
            return "📺";
        }
        if (name.includes("thưởng") || name.includes("bonus")) {
            return "🏅";
        }
        if (name.includes("tiền lãi") || name.includes("interest")) {
            return "💯";
        }
        if (name.includes("lương") || name.includes("salary")) {
            return "💰";
        }
        if (name.includes("được tặng") || name.includes("gifted")) {
            return "🎁";
        }
        if (name.includes("bán đồ") || name.includes("sell")) {
            return "🛍️";
        }
        if (name.includes("khoản thu") || name.includes("other income")) {
            return "💵";
        }
        if (name.includes("transportation") || name.includes("transport")) {
            return "🚗";
        }
        if (name.includes("investment")) {
            return "📈";
        }
        const firstLetter = categoryName.charAt(0);
        return firstLetter.toUpperCase();
    }
    
    function getIconColor(categoryName: string, isIncomeValue: boolean): string {
        const name = categoryName.toLowerCase();
        if (name.includes("cho vay") || name.includes("lend")) {
            return "bg-teal-500";
        }
        if (name.includes("trả nợ") || name.includes("pay debt")) {
            return "bg-teal-600";
        }
        if (name.includes("đi vay") || name.includes("borrow")) {
            return "bg-teal-500";
        }
        if (name.includes("thu nợ") || name.includes("collect debt")) {
            return "bg-teal-700";
        }
        if (name.includes("ăn uống") || name.includes("food") || name.includes("drink")) {
            return "bg-blue-700";
        }
        if (name.includes("nhà hàng") || name.includes("restaurant")) {
            return "bg-red-500";
        }
        if (name.includes("cà phê") || name.includes("coffee")) {
            return "bg-amber-700";
        }
        if (name.includes("hoá đơn") || name.includes("bill") || name.includes("tiện ích") || name.includes("utility")) {
            return "bg-gray-700";
        }
        if (name.includes("điện thoại") || name.includes("phone")) {
            return "bg-red-500";
        }
        if (name.includes("nước") || name.includes("water")) {
            return "bg-blue-400";
        }
        if (name.includes("điện") || name.includes("electric")) {
            return "bg-yellow-500";
        }
        if (name.includes("gas")) {
            return "bg-red-500";
        }
        if (name.includes("tv") || name.includes("television")) {
            return "bg-teal-500";
        }
        if (name.includes("thưởng") || name.includes("bonus")) {
            return "bg-yellow-500";
        }
        if (name.includes("tiền lãi") || name.includes("interest")) {
            return "bg-orange-500";
        }
        if (name.includes("lương") || name.includes("salary")) {
            return "bg-green-500";
        }
        if (name.includes("được tặng") || name.includes("gifted")) {
            return "bg-teal-700";
        }
        if (name.includes("bán đồ") || name.includes("sell")) {
            return "bg-blue-400";
        }
        if (name.includes("khoản thu") || name.includes("other income")) {
            return "bg-amber-700";
        }
        if (isIncomeValue === true) {
            return "bg-green-500";
        }
        return "bg-red-500";
    }
    
    const displayIcon = getIconForCategory(category.name);
    const iconColor = getIconColor(category.name, isIncome);
    
    let cardClassName = "w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ";
    if (isSelected === true) {
        cardClassName = cardClassName + "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-md transform scale-[1.02]";
    } else {
        cardClassName = cardClassName + "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md hover:border-gray-300";
    }
    
    let iconClassName = "flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white shadow-md ";
    iconClassName = iconClassName + iconColor;
    
    function handleEditClick(event: React.MouseEvent) {
        event.stopPropagation();
        if (onEdit !== undefined) {
            onEdit();
        }
    }
    
    function handleDeleteClick(event: React.MouseEvent) {
        event.stopPropagation();
        if (onDelete !== undefined) {
            if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
                onDelete();
            }
        }
    }
    
    return (
        <div
            onClick={onClick}
            className={cardClassName}
        >
            <div className={iconClassName}>
                {displayIcon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-gray-900 truncate">{category.name}</p>
                {category.note !== undefined && category.note !== null && category.note !== "" ? (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{category.note}</p>
                ) : null}
            </div>
            <div className="flex gap-2">
                {onEdit !== undefined ? (
                    <button
                        onClick={handleEditClick}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Sửa danh mục"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                ) : null}
                {onDelete !== undefined ? (
                    <button
                        onClick={handleDeleteClick}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Xóa danh mục"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                ) : null}
            </div>
        </div>
    );
}


