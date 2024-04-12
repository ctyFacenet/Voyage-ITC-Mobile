import React, { createContext, useState, useContext, ReactNode } from "react";

// Định nghĩa interface mới để bao gồm countApproval
interface NotificationContextType {
  countNotification: number;
  setCountNotification: (count: number) => void;
  countApproval: number;
  tokenDivice: string;
  setTokenDivice: (token: string) => void;
  setCountApproval: (count: number) => void;
}

// Tạo context với giá trị mặc định là undefined cho cả hai biến
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [countNotification, setCountNotification] = useState<number>(0);
  const [countApproval, setCountApproval] = useState<number>(0);
  const [tokenDivice, setTokenDivice] = useState<string>("");

  // Truyền cả hai biến và hàm setter tương ứng vào context
  return (
    <NotificationContext.Provider
      value={{
        countNotification,
        setCountNotification,
        countApproval,
        setCountApproval,
        tokenDivice,
        setTokenDivice,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook để sử dụng context
export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
