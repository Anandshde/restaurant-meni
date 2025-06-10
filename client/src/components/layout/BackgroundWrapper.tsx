"use client";

type Props = {
  children: React.ReactNode;
};

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative min-h-screen">
      {/* 🖼 Background image */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 bg-[url('https://i.pinimg.com/736x/44/b6/43/44b6437bbe2fd6b38b9a15e330e85968.jpg')]" />

      {/* 🌫️ Dark overlay */}

      {/* 📄 Main content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
