import { Spinner } from "@material-tailwind/react";

const Loading = ({ error }: { error: string }) => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center overflow-hidden ">
      <div className="w-fit h-fit animate-pulse text-4xl font-black uppercase">
        {error ? (
          error
        ) : (
          <Spinner
            className="h-16 w-16 text-gray-900/50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        )}
      </div>
    </div>
  );
};

export default Loading;
