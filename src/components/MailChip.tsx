import React from 'react';

export default function MailChip({
  closeModal
}: {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="absolute top-2 right-3">
        <button
          className="outline-none"
          onClick={() => {
            closeModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div id="mc_embed_signup" className="p-7">
        <form
          action="https://shopjym.us21.list-manage.com/subscribe/post?u=d8b021bc755694df9a983ac61&amp;id=3892fff6b1&amp;f_id=008be5e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_self"
        >
          <h2 className="text-center font-semibold text-xl">
            Suscribite a nuestra página
          </h2>
          <input
            type="email"
            name="EMAIL"
            className="p-2 bg-slate-100 rounded-md w-1/2 mt-5 outline-none"
            placeholder="Escribe tu email"
            id="mce-EMAIL"
            required
          />
          <input
            type="text"
            className="block mt-2 outline-none bg-white"
            disabled
            name="b_d8b021bc755694df9a983ac61_3892fff6b1"
            value=""
          />
          <button className="mt-2 p-2 w-full bg-sky-500 rounded-md text-white">
            Inscribirse
          </button>
        </form>
        <div className="mt-2 flex flex-row gap-2 items-center">
          <label htmlFor="checkbox">No volver a mostrar</label>
          <input
            type="checkbox"
            id="checkbox"
            className="p-2 rounded-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                window.localStorage.setItem('mailchip', 'true');
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
