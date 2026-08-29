import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  ConfirmedSubscription,
  DayLabel,
  DayPreset,
  PortalRole,
  RouteSelection,
  SubscriptionState,
} from "../types/subscription";
import { generateSubscriptionId, matchPlansForRoute, daysForPreset } from "../data/subscriptionPlans";

const STORAGE_KEY = "smartride:subscription:v1";

const DEFAULT_SELECTION: RouteSelection = {
  city: null,
  pickup: null,
  drop: null,
  dayPreset: null,
  customDays: [],
  pickupTime: null,
};

const DEFAULT_STATE: SubscriptionState = {
  selection: DEFAULT_SELECTION,
  matchedPlans: [],
  selectedPlanId: null,
  status: "draft",
  confirmed: null,
  role: null,
};

function loadState(): SubscriptionState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed, selection: { ...DEFAULT_SELECTION, ...parsed.selection } };
  } catch {
    return DEFAULT_STATE;
  }
}

interface SubscriptionContextValue {
  state: SubscriptionState;
  hydrated: boolean;
  setCity: (citySlug: string) => void;
  setPickup: (area: string) => void;
  setDrop: (area: string) => void;
  setDayPreset: (preset: DayPreset) => void;
  toggleCustomDay: (day: DayLabel) => void;
  setCustomDays: (days: DayLabel[]) => void;
  setPickupTime: (time: string) => void;
  routeError: string | null;
  isRouteReady: boolean;
  findPlans: () => void;
  selectPlan: (planId: string) => void;
  goToReview: () => void;
  editDetails: () => void;
  retryRoute: () => void;
  confirmSubscription: () => ConfirmedSubscription | null;
  setRole: (role: PortalRole) => void;
  resetFlow: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage may be unavailable (private mode / quota) — the demo
      // still works in-memory for the current session.
    }
  }, [state, hydrated]);

  const setCity = useCallback((citySlug: string) => {
    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, city: citySlug, pickup: null, drop: null },
      matchedPlans: [],
      selectedPlanId: null,
      status: "draft",
    }));
  }, []);

  const setPickup = useCallback((area: string) => {
    setState((prev) => ({
      ...prev,
      selection: {
        ...prev.selection,
        pickup: area,
        drop: prev.selection.drop === area ? null : prev.selection.drop,
      },
      matchedPlans: [],
      selectedPlanId: null,
      status: "draft",
    }));
  }, []);

  const setDrop = useCallback((area: string) => {
    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, drop: area },
      matchedPlans: [],
      selectedPlanId: null,
      status: "draft",
    }));
  }, []);

  const setDayPreset = useCallback((preset: DayPreset) => {
    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, dayPreset: preset, customDays: preset === "custom" ? prev.selection.customDays : [] },
      matchedPlans: [],
      selectedPlanId: null,
      status: "draft",
    }));
  }, []);

  const toggleCustomDay = useCallback((day: DayLabel) => {
    setState((prev) => {
      const has = prev.selection.customDays.includes(day);
      const customDays = has
        ? prev.selection.customDays.filter((d) => d !== day)
        : [...prev.selection.customDays, day];
      return {
        ...prev,
        selection: { ...prev.selection, customDays },
        matchedPlans: [],
        selectedPlanId: null,
        status: "draft",
      };
    });
  }, []);

  /** Sets the full custom-day list at once (e.g. from a day-by-day toggle
   * widget elsewhere on the site), rather than toggling one day at a time. */
  const setCustomDays = useCallback((days: DayLabel[]) => {
    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, dayPreset: "custom", customDays: days },
      matchedPlans: [],
      selectedPlanId: null,
      status: "draft",
    }));
  }, []);

  const setPickupTime = useCallback((time: string) => {
    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, pickupTime: time },
      matchedPlans: [],
      selectedPlanId: null,
      status: "draft",
    }));
  }, []);

  const { selection } = state;
  const days = useMemo(() => daysForPreset(selection.dayPreset, selection.customDays), [selection.dayPreset, selection.customDays]);

  const routeError = useMemo(() => {
    if (selection.pickup && selection.drop && selection.pickup === selection.drop) {
      return "Pickup and drop locations must be different.";
    }
    return null;
  }, [selection.pickup, selection.drop]);

  const isRouteReady = Boolean(
    selection.city && selection.pickup && selection.drop && !routeError && days.length > 0 && selection.pickupTime,
  );

  const findPlans = useCallback(() => {
    setState((prev) => {
      const d = daysForPreset(prev.selection.dayPreset, prev.selection.customDays);
      if (!prev.selection.city || !prev.selection.pickup || !prev.selection.drop || !prev.selection.pickupTime || d.length === 0) {
        return prev;
      }
      if (prev.selection.pickup === prev.selection.drop) return prev;
      const matchedPlans = matchPlansForRoute({
        city: prev.selection.city,
        pickup: prev.selection.pickup,
        drop: prev.selection.drop,
        days: d,
        pickupTime: prev.selection.pickupTime,
      });
      return { ...prev, matchedPlans, status: "matched", selectedPlanId: null };
    });
  }, []);

  /** Sends the user back to an editable form without discarding their
   * answers — used by the "no plans found" empty state, since re-running
   * findPlans() on the same unchanged inputs would just reproduce the same
   * empty result. */
  const retryRoute = useCallback(() => {
    setState((prev) => ({ ...prev, matchedPlans: [], selectedPlanId: null, status: "draft" }));
  }, []);

  const selectPlan = useCallback((planId: string) => {
    setState((prev) => ({ ...prev, selectedPlanId: planId }));
  }, []);

  const goToReview = useCallback(() => {
    setState((prev) => (prev.selectedPlanId ? { ...prev, status: "reviewing" } : prev));
  }, []);

  const editDetails = useCallback(() => {
    setState((prev) => ({ ...prev, status: "matched" }));
  }, []);

  const confirmSubscription = useCallback((): ConfirmedSubscription | null => {
    let result: ConfirmedSubscription | null = null;
    setState((prev) => {
      const plan = prev.matchedPlans.find((p) => p.id === prev.selectedPlanId);
      if (!plan || !prev.selection.city || !prev.selection.pickup || !prev.selection.drop || !prev.selection.pickupTime) {
        return prev;
      }
      const confirmed: ConfirmedSubscription = {
        id: generateSubscriptionId(plan.id),
        createdAt: new Date().toISOString(),
        route: { city: prev.selection.city, pickup: prev.selection.pickup, drop: prev.selection.drop },
        days: plan.days,
        pickupTime: prev.selection.pickupTime,
        plan,
      };
      result = confirmed;
      return { ...prev, status: "confirmed", confirmed };
    });
    return result;
  }, []);

  const setRole = useCallback((role: PortalRole) => {
    setState((prev) => ({ ...prev, role }));
  }, []);

  const resetFlow = useCallback(() => {
    setState((prev) => ({ ...DEFAULT_STATE, role: prev.role }));
  }, []);

  const value: SubscriptionContextValue = {
    state,
    hydrated,
    setCity,
    setPickup,
    setDrop,
    setDayPreset,
    toggleCustomDay,
    setCustomDays,
    setPickupTime,
    routeError,
    isRouteReady,
    findPlans,
    selectPlan,
    goToReview,
    editDetails,
    retryRoute,
    confirmSubscription,
    setRole,
    resetFlow,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return ctx;
}
