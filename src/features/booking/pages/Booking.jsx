import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Booking = () => {
    const { t } = useTranslation();
    return (
        <div className="">
            <Button>{t("general.jusoor")}</Button>
        </div>
    );
};

export default Booking;
