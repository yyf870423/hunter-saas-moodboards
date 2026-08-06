import { QuietOperationsDashboard } from "../moodboards/QuietOperations";
import { ExecutiveBriefingDashboard } from "../moodboards/ExecutiveBriefing";
import { ClientRoomDashboard } from "../moodboards/ClientRoom";
import { TalentJournalDashboard } from "../moodboards/TalentJournal";
import { ConversationDeskDashboard } from "../moodboards/ConversationDesk";
import { SwissGridDashboard } from "../moodboards/SwissGrid";
import { PaperlessStudioDashboard } from "../moodboards/PaperlessStudio";
import { ContextualCopilotDashboard } from "../moodboards/ContextualCopilot";
import { GuidedAutomationDashboard } from "../moodboards/GuidedAutomation";
import { EvidenceReviewDashboard } from "../moodboards/EvidenceReview";

const dashboards = {
  "precision-desk": QuietOperationsDashboard,
  "command-center": ExecutiveBriefingDashboard,
  "human-studio": ClientRoomDashboard,
  "kinetic-blueprint": TalentJournalDashboard,
  "physical-telemetry": ConversationDeskDashboard,
  "institutional-trust": SwissGridDashboard,
  "expedition-search": PaperlessStudioDashboard,
  "guided-service": ContextualCopilotDashboard,
  "teamwork-fabric": GuidedAutomationDashboard,
  "pattern-library": EvidenceReviewDashboard,
};

export function MainMoodboard({ board }) {
  const Page = dashboards[board.slug];
  return <Page />;
}
