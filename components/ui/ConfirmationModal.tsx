import { Dialog, Portal } from "@ark-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface ConfirmationModalProps {
  callback: () => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalAnimations = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

export default function ConfirmationModal({ callback, isModalOpen, setIsModalOpen }: ConfirmationModalProps) {
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop className="data-[scope=dialog]:data-[part=backdrop]:data-[state=open]:animate-fadeIn data-[scope=dialog]:data-[part=backdrop]:data-[state=closed]:animate-fadeOut fixed inset-0 z-40 bg-black/40" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isModalOpen && (
              <motion.div
                className="h-40 w-72 rounded-2xl bg-tertiary"
                variants={modalAnimations}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Dialog.Content className="flex h-full flex-col items-center justify-around gap-4 p-6 text-center">
                  <Dialog.Title className="text-2xl font-semibold">Are you sure?</Dialog.Title>
                  <div className="flex gap-4">
                    <Dialog.CloseTrigger className="rounded-md border border-secondary p-2 px-4 font-semibold text-secondary">
                      No
                    </Dialog.CloseTrigger>
                    <Button onClick={callback} className="bg-secondary px-4 text-white">
                      Yes
                    </Button>
                  </div>
                </Dialog.Content>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
