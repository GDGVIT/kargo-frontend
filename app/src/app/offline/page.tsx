"use client";

import Card from "../../components/ui/Card/Card";
import AnimatedButton from "../../components/ui/AnimatedButton/AnimatedButton";

export default function OfflinePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <section>
        <Card className=" p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-100">
            You are offline
          </h1>
          <p className="text-gray-300 mb-6">
            It looks like you have lost your internet connection.
            <br />
            Please check your network and try again.
          </p>
          <div className="flex justify-center">
            <AnimatedButton
              onClick={() => window.location.reload()}
              variant="primary"
              className="mt-2"
            >
              Retry
            </AnimatedButton>
          </div>
        </Card>
      </section>
    </main>
  );
}
