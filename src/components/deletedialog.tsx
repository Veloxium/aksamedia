import { useRef, useEffect } from "react";

function DeleteDialog({
  isDialogOpen,
  setIsDialogOpen,
  deleteProduct,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
  deleteProduct: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen, setIsDialogOpen]);

  if (!isDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={dialogRef}
        className="rounded-md shadow-lg p-6 bg-white dark:bg-zinc-900 border border-zprimary dark:border-zprimary-light"
      >
        <form method="dialog" className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-zprimary dark:text-zprimary-light">
            Konfirmasi Hapus Produk
          </h2>
          <p className="mb-6 text-center text-gray-700 dark:text-gray-200">
            Apakah Anda yakin ingin menghapus produk ini?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
            >
              Batal
            </button>
            <button
              id="confirmDeleteBtn"
              onClick={deleteProduct}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Hapus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteDialog;
