const FeaturedIcon = ({ icon, size }) => {
  let parentSize, childSize;

  switch (size) {
    case "lg":
      parentSize = "w-14 h-14";
      childSize = "w-11 h-11";
      break;
    case "md":
      parentSize = "w-12 h-12";
      childSize = "w-9 h-9";
      break;
    case "sm":
      parentSize = "w-10 h-10";
      childSize = "w-7 h-7";
      break;
    default:
      parentSize = "w-12 h-12"; // Default to medium size
      childSize = "w-9 h-9";
  }

  return (
    <div
      className={`bg-primary-foreground rounded-full relative flex items-center justify-center ${parentSize}`}
    >
      <div
        className={`bg-primary-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center flex items-center text-2xl text-primary-500 ${childSize}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default FeaturedIcon;
