import { useQuery } from "@tanstack/react-query";
import { endOfMonth, startOfMonth } from "date-fns";

import type { OrderDirection, Payslip } from "@/lib/types";

const files = [
  "doge1.jpeg",
  "doge2.jpeg",
  "doge3.jpeg",
  "doge4.jpeg",
  "doge5.jpeg",
  "doge6.jpeg",
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * files.length);
  return files[randomIndex];
};

const generateMockData = (numPayslips: number) => {
  let currentDate = new Date();

  const mockData: Payslip[] = Array.from({ length: numPayslips }, (_, i) => {
    const fromDate = startOfMonth(currentDate);
    const toDate = endOfMonth(currentDate);
    const file = getRandomImage();
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    return {
      id: `payslip-id-${i}`,
      fromDate,
      toDate,
      file: `/assets/images/${file}`,
    };
  });

  return mockData;
};

const payslips = generateMockData(24);

const PAGE_SIZE = 9;

const fetchPayslips = async (
  pageNum: number,
  orderDirection: OrderDirection
) => {
  const start = pageNum * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const data =
    orderDirection === "desc"
      ? [...payslips].slice(start, end)
      : [...payslips].reverse().slice(start, end);
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 700 + 300)
  );
  return data;
};

export const usePayslips = (
  pageNum: number,
  orderDirection: OrderDirection
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["payslips", pageNum, orderDirection],
    queryFn: () => fetchPayslips(pageNum, orderDirection),
  });

  return {
    data,
    isLoading,
    hasNext: data && data.length > 0,
  };
};

export const usePayslipById = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["payslip", id],
    enabled: !!id,
    queryFn: () => {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(payslips.find((p) => p.id === id)),
          Math.random() * 700 + 300
        )
      );
    },
  });

  return {
    data: data as Payslip | undefined,
    isLoading,
  };
};
