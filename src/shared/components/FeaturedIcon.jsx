const FeaturedIcon = ({ icon }) => {
  return (
    <div className="w-14 h-14 bg-primary-foreground rounded-full relative flex items-center justify-center">
      <div className="w-10 h-10 bg-primary-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center flex  items-center text-2xl text-primary-500">
        {icon}
      </div>
    </div>
  );
};

export default FeaturedIcon;
