import React from "react";
import Button from "../../../ui/AnimatedButton/AnimatedButton";
import RepoPaginationProps from "../../../../types/Repo/RepoPaginationProps";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RepoPagination: React.FC<RepoPaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => (
  <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-3 sm:gap-8 w-full">
    <Button
      onClick={onPrev}
      disabled={page === 1}
      aria-label="Previous page"
      icon={<FaArrowLeft />}
      variant="secondary"
    >
      Previous
    </Button>
    <span aria-live="polite" aria-atomic="true">
      Page {page} of {totalPages}
    </span>
    <Button
      onClick={onNext}
      disabled={page === totalPages || totalPages === 0}
      aria-label="Next page"
      icon={<FaArrowRight />}
      variant="secondary"
    >
      Next
    </Button>
  </div>
);

export default RepoPagination;
