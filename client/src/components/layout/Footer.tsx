"use client";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 text-center py-6 text-sm text-gray-600 mt-10 border-t">
      <p>
        📍 Манай хаяг:{" "}
        <a
          href="https://www.google.com/maps/place/47.9153,106.9057"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Google Maps дээр харах
        </a>
      </p>
      <p>📞 Холбогдох утас: 99119911</p>
      <p>© 2025 - Restaurant Menu</p>
    </footer>
  );
}
