export default function Footer() {
  return (
    <div>
      <footer className="w-screen py-8 text-center border-t border-gray-200 bg-footer-bg bg-linear-to-tl from-footer-bg to-tertiary">
        <div className="flex items-center justify-center mb-2">
          <div className="flex flex-col items-end gap-2">
            <p className="text-gray-600 text-sm whitespace-nowrap ">2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
