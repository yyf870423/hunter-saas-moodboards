import { PrecisionExperience } from "./PrecisionExperience";
import { CommandExperience } from "./CommandExperience";
import { ClientExperience } from "./ClientExperience";
import { JournalExperience } from "./JournalExperience";
import { InboxExperience } from "./InboxExperience";
import { WorkBuddyExperience } from "./WorkBuddyExperience";
import { ResearchExperience } from "./ResearchExperience";
import { CopilotExperience } from "./CopilotExperience";
import { OpportunityExperience } from "./OpportunityExperience";
import { DecisionExperience } from "./DecisionExperience";

const experiences = {
  "precision-desk": PrecisionExperience,
  "command-center": CommandExperience,
  "human-studio": ClientExperience,
  "kinetic-blueprint": JournalExperience,
  "physical-telemetry": InboxExperience,
  "institutional-trust": WorkBuddyExperience,
  "expedition-search": ResearchExperience,
  "guided-service": CopilotExperience,
  "teamwork-fabric": OpportunityExperience,
  "pattern-library": DecisionExperience,
};

export function ExperiencePage({ board, view }) {
  const Page = experiences[board.slug];
  return Page ? <Page view={view} /> : <div className="fatal-state">未找到业务页面。</div>;
}
