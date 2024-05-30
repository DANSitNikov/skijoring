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
  id: string;
  title: string;
  description: string;
};

const EventCard = ({ id, title, description }: EventCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>...</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="ml-auto">
          <Link href={publicRoutes.event(String(id))}>Перейти</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(EventCard);
