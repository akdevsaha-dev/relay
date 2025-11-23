import { UserRoundPlus, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const AddContacts = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `http://localhost:3000/api/v1/contact/search?query=${query}`
      );
      const data = await res.json();
      setResults(data.users);
      setOpen(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] md:w-[50%] h-[70%] bg-white rounded-xl shadow-lg p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="flex gap-4">
          <UserRoundPlus className="text-neutral-600" />
          <div className="font-bold text-xl">Add New Contact</div>
        </div>
        <div className="text-neutral-500 mt-2">
          Enter the contact details to add them to your contact list.
        </div>

        <div className="mt-6 md:mt-12">
          <label className="ml-2 font-semibold">Email</label>

          <div className="relative w-full" ref={dropdownRef}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 placeholder-neutral-400 mt-4 rounded-full bg-[#f5f3ef] outline-none focus:ring-2 focus:ring-neutral-300 px-6"
              placeholder="johndoe@gmail.com"
            />

            {open && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg mt-2 z-50 max-h-48 overflow-y-auto">
                {loading && (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    Searching…
                  </div>
                )}

                {!loading && results.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No users found
                  </div>
                )}

                {results.map((user) => (
                  <div
                    key={user.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(user.email);
                      setOpen(false);
                    }}
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full mt-48 flex justify-end">
          <div className="px-5 py-2 rounded-2xl text-neutral-700 bg-[#f5f3ef] hover:bg-[#ebe8e4] cursor-pointer">
            Add Contact
          </div>
        </div>
      </div>
    </div>
  );
};
