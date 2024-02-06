export const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <img
        alt="Not Found"
        src="/assets/images/404.png"
        className="max-h-80"
      />
      <h6 className="text-destructive bg-foreground rounded-md px-4 py-2 font-semibold">
        Not found
      </h6>
    </div>
  );
};
