function Badge({className, children}){
    return (
        <span className={`inline-flex items-center px-2.5 py-0.8 rounded-full text-xs font-semibold ${className}`}>
            {children}
        </span>
    );
}

export default Badge;