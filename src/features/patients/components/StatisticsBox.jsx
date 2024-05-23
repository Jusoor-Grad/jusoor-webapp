import { useTranslation } from "react-i18next";
import {
  IoArrowDown,
  IoArrowUp,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircularProgress } from "@nextui-org/react";
import validation from "@/shared/utils/validation";
import { TbGraphOff } from "react-icons/tb";

const StatisticsBox = ({
  title = "title",
  dropdownMenu = false,
  number = 0,
  ratio = 0,
  showRatio = true,
  data,
  gray,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6 p-6 shadow-sm border border-gray-200 rounded-10 bg-white h-[200px]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        {dropdownMenu && <DropdownMenuDemo />}
      </div>
      <div className="flex item-cent gap-6 ">
        <div className=" flex flex-col gap-4 whitespace-nowrap">
          <h2 className="text-5xl font-bold">
            {number !== undefined ? number : <CircularProgress size="sm" />}
          </h2>
          <p className=" text-gray-500  flex gap-2  ">
            {!validation.isEmpty(ratio) && !isNaN(ratio) && showRatio && (
              <span
                className={`${
                  ratio > 0 ? "text-success-500" : "text-error-500"
                } flex gap-1 items-center`}
              >
                {ratio > 0 ? (
                  <>
                    {ratio} % <IoArrowUp /> {t("patients.compareToLastMonth")}
                  </>
                ) : (
                  <>
                    {ratio} % <IoArrowDown /> {t("patients.compareToLastMonth")}
                  </>
                )}
              </span>
            )}
          </p>
        </div>
        <div
          className={`w-full ${
            number === 0 && "flex justify-end px-12 items-center"
          }`}
        >
          {number > 0 ? (
            <Chart data={data} />
          ) : (
            <div className="flex items-center flex-col">
              <TbGraphOff className="text-7xl text-gray-300" />
              <h1 className="pb-4 text-gray-300 font-bold">
                {t("general.notStatFound")}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;

const Chart = ({ data, gray }) => {
  const gradientId = "gradientPurpleTransparent";
  let gradientColor = gray ? "#EAECF0" : "#6ce9a6";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`${gradientColor}`} stopOpacity={1} />
            <stop offset="100%" stopColor={gradientColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="number"
          stroke={gray ? "#98A2B3" : "#32d583"}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const DropdownMenuDemo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="transparent" className="text-gray-400 p-0 ">
          <IoEllipsisVerticalOutline className="text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
