import toast from "react-hot-toast";

const showAddToFavouriteToast = (title) => {
  toast.success(
    <span>
      <span className="font-bold">{title}</span> added to your favourites
    </span>,
    { duration: 3000 }
  );
};

const showRemoveFromFavouriteToast = (title) => {
  toast.error(
    <span>
      <span className="font-bold">{title}</span> removed from your favourites
    </span>,
    { duration: 3000 }
  );
};

export default { showAddToFavouriteToast, showRemoveFromFavouriteToast };
