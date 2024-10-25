"use client"

import styles from "./home.module.css";
import PageLoader from "@/features/(shared)/_components/PageLoader";
import { useStateFromPanther } from "@/features/(shared)/_hooks/state.useStateFromPanther";
import SharedStateWrapper from "@/features/(shared)/_components/SharedStateWrapper";
import ContentSection from "@/features/(appLayout)/_components/ContentSection";

export default function AppPage() {

  // fetch from backend and case for revalidate time
  const fetchUrl = `/api/greengage-atmotube/metadata`

  // prepare shared state from fetched data from panther backend
  const { isLoading, sharedAppState, dispatch } = useStateFromPanther(fetchUrl)

  // when ready, render the main page
  if (!isLoading) {
    return (
      // wrap everything into shared state react contexts
      <SharedStateWrapper sharedState={sharedAppState} sharedStateDispatchFunction={dispatch}>
        <main className={styles.main}>
          Map
          <ContentSection />
        </main >
      </SharedStateWrapper>
    );
  }

  //... or show cute loading animation
  else {
    return (
      <PageLoader />
    )
  }
}
