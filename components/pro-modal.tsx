"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useState, useEffect } from "react";
import axios from "axios";

export const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();
  const [isMounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create
            <span className="text-sky-500 font-medium mx-1">
              Custom AI
            </span>{" "}
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            Rs. ~ 199<span className="text-sm font-normal">.99 / mo</span>
          </p>
          <Button disabled={loading} onClick={onSubscribe} variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
