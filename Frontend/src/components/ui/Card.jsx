const Card = ({ children, className }) => (
    <div
      className={`bg-[#333333] text-white p-6 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );

export const CardContent = ({ children }) =>  <div className="space-y-4">{children}</div>;

export default Card;