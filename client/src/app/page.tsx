"use client";

import { useState, useEffect } from "react";
import { fetchMenu } from "@/lib/api/menu";
import { MenuItem } from "@/types";
import HeroSection from "@/components/homepage/HeroSelection";
import DaySelector from "@/components/homepage/DaySelector";
import MenuSection from "@/components/homepage/MenuSection";
import FoodDialog from "@/components/homepage/FoodDialog";
import BackgroundWrapper from "@/components/layout/BackgroundWrapper";
import Footer from "@/components/layout/Footer";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMenu();
      setMenuData(data);
    };
    loadData();
  }, []);

  const lunchItems = menuData.filter(
    (item) =>
      item.category === "Lunch" &&
      Array.isArray(item.days) &&
      item.days.includes(selectedDay)
  );

  const mainFoods = menuData.filter((item) => item.category === "Main");
  const drinks = menuData.filter((item) => item.category === "Drink");
  const desserts = menuData.filter((item) => item.category === "Desserts");
  const soups = menuData.filter((item) => item.category === "Soup");
  const salads = menuData.filter((item) => item.category === "Salad");

  return (
    <BackgroundWrapper>
      <HeroSection />
      <DaySelector
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        days={days}
      />

      <MenuSection
        title={`🍛 Lunch - ${selectedDay}`}
        items={lunchItems}
        onSelect={setSelectedFood}
        titleColor="text-yellow-400"
      />

      <MenuSection
        title="🍽 Main Foods"
        items={mainFoods}
        onSelect={setSelectedFood}
        titleColor="text-yellow-400"
      />

      <MenuSection
        title="🥤 Drinks"
        items={drinks}
        onSelect={setSelectedFood}
        titleColor="text-blue-400"
      />

      <MenuSection
        title="🍰 Desserts"
        items={desserts}
        onSelect={setSelectedFood}
        titleColor="text-pink-400"
      />

      <MenuSection
        title="🍲 Soups"
        items={soups}
        onSelect={setSelectedFood}
        titleColor="text-orange-400"
      />

      <MenuSection
        title="🥗 Salads"
        items={salads}
        onSelect={setSelectedFood}
        titleColor="text-green-400"
      />

      <FoodDialog food={selectedFood} onClose={() => setSelectedFood(null)} />
      <Footer />
    </BackgroundWrapper>
  );
}
