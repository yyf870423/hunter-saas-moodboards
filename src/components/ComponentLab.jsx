import { QuietOperationsComponents } from "../moodboards/QuietOperations";
import { ExecutiveBriefingComponents } from "../moodboards/ExecutiveBriefing";
import { ClientRoomComponents } from "../moodboards/ClientRoom";
import { TalentJournalComponents } from "../moodboards/TalentJournal";
import { ConversationDeskComponents } from "../moodboards/ConversationDesk";
import { SwissGridComponents } from "../moodboards/SwissGrid";
import { PaperlessStudioComponents } from "../moodboards/PaperlessStudio";
import { ContextualCopilotComponents } from "../moodboards/ContextualCopilot";
import { GuidedAutomationComponents } from "../moodboards/GuidedAutomation";
import { EvidenceReviewComponents } from "../moodboards/EvidenceReview";

const components = {
  "precision-desk": QuietOperationsComponents,
  "command-center": ExecutiveBriefingComponents,
  "human-studio": ClientRoomComponents,
  "kinetic-blueprint": TalentJournalComponents,
  "physical-telemetry": ConversationDeskComponents,
  "institutional-trust": SwissGridComponents,
  "expedition-search": PaperlessStudioComponents,
  "guided-service": ContextualCopilotComponents,
  "teamwork-fabric": GuidedAutomationComponents,
  "pattern-library": EvidenceReviewComponents,
};

export function ComponentLab({ board }) {
  const Page = components[board.slug];
  return <Page />;
}
