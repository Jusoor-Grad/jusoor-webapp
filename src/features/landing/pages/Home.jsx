import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="p-5">
      <Button>{t("general.jusoor")}</Button>
    </div>
  );
};

export default Home;
