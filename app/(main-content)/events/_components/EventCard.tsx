"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { publicRoutes } from "@/routes/routes";
import Link from "next/link";
import React, { memo } from "react";

type EventCardProps = {
  id: number;
};

const EventCard = ({ id }: EventCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title - {id}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={publicRoutes.event(String(id))}>Перейти</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(EventCard);
