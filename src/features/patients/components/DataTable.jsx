"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useNavigate } from "react-router-dom";
import { history } from "@/routes/CustomHistory";
import { showFlashMessage } from "@/store/slices/notifications";
import { store } from "./../../../store/store";
import { t } from "i18next";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        disabled={true}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        disabled={true}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <p>{i18n.t("patients.id")}</p>,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate(); // Initialize useNavigate

      const handleClick = () => {
        navigate(`/patients/${row.original.id}`); // Navigate to /patients/:id
      };

      return (
        <a
          onClick={handleClick}
          className="underline"
          style={{ cursor: "pointer" }}
        >
          {row.original.id}
        </a>
      );
    },
  },
  {
    accessorKey: "username",
    header: () => <p>{i18n.t("patients.username")}</p>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <p>{i18n.t("patients.email")}</p>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "department",
    header: () => <p>{i18n.t("patients.department")}</p>,
    cell: ({ row }) => {
      const department = row.getValue("department");

      return <div className="font-medium">{department}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={i18n.language === "ar" ? "text-end" : "text-start"}
          >
            <DropdownMenuLabel>{i18n.t("general.action")}</DropdownMenuLabel>
            <DropdownMenuItem
              className={`cursor-pointer text-center items-center flex justify-${
                i18n.language === "ar" ? "end" : "start"
              }`}
              onClick={() => {
                navigator.clipboard.writeText(row.original.id);
                store.dispatch(
                  showFlashMessage({
                    message: t("patients.patientIDSuccessfullyCopied", {
                      patientID: row.original.id,
                    }),
                    severity: "success",
                  })
                );
              }}
            >
              {i18n.t("patients.copyPatientID")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`cursor-pointer text-center items-center flex justify-${
                i18n.language === "ar" ? "end" : "start"
              }`}
              onClick={() => history.navigate(`/patients/${row.original.id}`)}
            >
              {i18n.t("patients.viewPatient")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const DataTable = ({
  data = [],
  count = 1,
  getNextPageData,
  loading,
}) => {
  const { t } = useTranslation();
  const [sorting, setSorting] = React.useState();
  const [columnFilters, setColumnFilters] = React.useState();
  const [columnVisibility, setColumnVisibility] = React.useState();
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState(1);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const numPages = Math.ceil(count / 5);
  const renderPaginationItems = () => {
    const paginationItems = [];

    if (numPages <= 4) {
      for (let i = 1; i <= numPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === page}
              onClick={() => {
                setPage(i);
                getNextPageData(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const startPage = Math.max(1, page - 1);
      const endPage = Math.min(numPages, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === page}
              onClick={() => {
                setPage(i);
                getNextPageData(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return paginationItems;
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody style={{ height: "350px" }}>
            {loading ? (
              <>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("general.loading")}
                </TableCell>
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("general.noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center w-full ">
        <Pagination className={"w-full "}>
          <PaginationContent className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPage(page - 1);
                getNextPageData(page - 1);
              }}
              disabled={page - 1 === 0}
            >
              <ChevronRight
                className={`h-4 w-4 ${i18n.language === "en" && "rotate-180"}`}
              />
              {t("patients.previousPage")}
            </Button>
            <div className="flex gap-2">{renderPaginationItems()}</div>

            <Button
              variant="outline"
              onClick={() => {
                setPage(page + 1);
                getNextPageData(page + 1);
              }}
              disabled={page === numPages}
            >
              {t("patients.nextPage")}
              <ChevronLeft
                className={`h-4 w-4 ${i18n.language === "en" && "rotate-180"}`}
              />
            </Button>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
