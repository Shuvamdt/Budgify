import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const TransactionTable = ({ data }) => {
  return (
    <div className="px-4 py-2 mx-4 my-4 bg-[#F48C06] rounded-2xl">
      <Table>
        <TableCaption>
          <p className="text-[#E85D04]">A list of your recent invoices.</p>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl no.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((element, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{element.date}</TableCell>
              <TableCell>{element.name}</TableCell>
              <TableCell className="text-right">{element.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
