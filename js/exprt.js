/*
 * exprt.js
 *
 * Michael T. Wescoat
 * College of Social Sciences
 * San Jose State Univiersity
 * October 5, 2017
 *
 */

var CoSS = this.CoSS || {};

CoSS.exprt = (function (my, window) {
    "use strict";

    var document = window.document,
        toKey = {
            ResponseID: "id",

            Q2: "email",
            Q3: "name",
            Q4: "share",
            Q52: "rank",
            Q52_TEXT: "rankText",
            Q5: "department",
            Q5_TEXT: "departmentText",

            Q6_1: "bookProposal",
            Q6_2: "bookManuscript",
            Q6_3: "bookEdited",
            Q6_4: "bookTrade",
            Q6_5: "bookManual",
            Q6_6: "bookReference",
            Q6_7: "bookHandbook",
            Q6_8: "bookTextbook",
            Q6_9: "bookPopular",
            Q6_10: "bookOther",
            Q6_10_TEXT: "bookOtherText",

            Q8_1: "journalSelecting",
            Q8_2: "journalReviewProcess",
            Q8_3: "journalReviewerComments",
            Q8_4: "journalRevising",
            Q8_5: "journalCoverLetter",
            Q8_6: "journalMultiauthorWriting",
            Q8_7: "journalMultiauthorReview",
            Q8_8: "journalOther",
            Q8_8_TEXT: "journalOtherText",

            Q9_1: "manuscriptPeerReviewBecomeReviewer",
            Q9_2: "manuscriptPeerReviewChooseJournal",
            Q9_3: "manuscriptPeerReviewBestPractices",
            Q9_4: "manuscriptPeerReviewOther:",
            Q9_4_TEXT: "manuscriptPeerReviewOtherText",

            Q10_1: "opEdSelectingPublication",
            Q10_2: "opEdWriting",
            Q10_3: "opEdOther",
            Q10_3_TEXT: "opEdOtherText",

            Q11_1: "bookReviewWriting",
            Q11_2: "bookReviewValue",
            Q11_3: "bookReviewOther:",
            Q11_3_TEXT: "bookReviewOtherText",

            Q12_1: "journalEditorBecomeEditor",
            // Q12_2 not present
            Q12_3: "journalEditorManageWorkload",
            Q12_4: "journalEditorOther",
            Q12_4_TEXT: "journalEditorOtherText",
            Q12_5: "journalEditorAssignPeerReviewer",
            Q12_6: "journalEditorFindAdvisoryBoard",
            Q12_7: "journalEditorSpecialIssue",
            // Q12_8-Q12_12 not present
            Q12_13: "journalEditorPlanContent",

            Q13_1: "quantMethodsStatsOlsRegression",
            Q13_2: "quantMethodsStats2slsAnd3slsRegression",
            Q13_3: "quantMethodsStatsStructuralEquationModeling",
            Q13_4: "quantMethodsStatsTimeSeriesModeling",
            Q13_5: "quantMethodsStatsPoissonRegression",
            Q13_6: "quantMethodsStatsBinomialRegression",
            Q13_7: "quantMethodsStatsProbitRegression",
            Q13_8: "quantMethodsStatsBinaryLogisticRegression",
            Q13_9: "quantMethodsStatsMultinomialLogisticRegression",
            Q13_10: "quantMethodsStatsNestedLogisticRegression",
            Q13_11: "quantMethodsStatsMultilevelModeling",
            Q13_12: "quantMethodsStatsComputationalModeling",
            Q13_13: "quantMethodsStatsAgentbasedModeling",
            Q13_14: "quantMethodsStatsOtherText",
            Q13_14_TEXT: "quantMethodsStatsOtherText",

            Q14_1: "quantMethodsResearchContentAnalysis",
            Q14_2: "quantMethodsResearchLabExperiments",
            Q14_3: "quantMethodsResearchLongitudinalResearch",
            Q14_4: "quantMethodsResearchMediationAndModeration",
            Q14_5: "quantMethodsResearchRegressionDiscontinuity",
            Q14_6: "quantMethodsResearchFieldExperiments",
            Q14_7: "quantMethodsResearchOther",
            Q14_7_TEXT: "quantMethodsResearchOtherText",

            Q15_1: "quantMethodsSoftwareAMOS",
            Q15_2: "quantMethodsSoftwareArcGIS",
            Q15_3: "quantMethodsSoftwareQGIS",
            Q15_4: "quantMethodsSoftwareQualtrics",
            Q15_5: "quantMethodsSoftwareIMAGINE",
            Q15_6: "quantMethodsSoftwareLIMDEP",
            Q15_7: "quantMethodsSoftwareMATLAB",
            Q15_8: "quantMethodsSoftwareR",
            Q15_9: "quantMethodsSoftwareSAS",
            Q15_10: "quantMethodsSoftwareStata",
            Q15_11: "quantMethodsSoftwareSPSS",
            Q15_12: "quantMethodsSoftwareZTree",
            Q15_13: "quantMethodsSoftwareOther",
            Q15_13_TEXT: "quantMethodsSoftwareOtherText",

            Q16_1: "qualMethodsResearcArchival",
            Q16_2: "qualMethodsResearcCaseStudies",
            Q16_3: "qualMethodsResearcCommodityChain",
            Q16_4: "qualMethodsResearcContentAnalysis",
            Q16_5: "qualMethodsResearcEthnographic",
            Q16_6: "qualMethodsResearcFocusGroups",
            Q16_7: "qualMethodsResearcGaBiLifeCycleAssessment",
            Q16_8: "qualMethodsResearcInterviewsInDepth",
            Q16_9: "qualMethodsResearcInterviewsSemistructured",
            Q16_10: "qualMethodsResearcNRELSystemsAdvisorModel",
            Q16_11: "qualMethodsResearcOralHistory",
            Q16_12: "qualMethodsResearcParticipantObservation",
            Q16_13: "qualMethodsResearcPerformance",
            Q16_14: "qualMethodsResearcRhetoricalAnalysis",
            Q16_15: "qualMethodsResearcTextualAnalysis",
            Q16_16: "qualMethodsResearchOther",
            Q16_16_TEXT: "qualMethodsResearchOtherText",

            Q17_1: "qualMethodsSoftwareAtlasti",
            Q17_2: "qualMethodsSoftwareDedoose",
            Q17_3: "qualMethodsSoftwareQDAMiner",
            Q17_4: "qualMethodsSoftwareMAXQDA",
            Q17_5: "qualMethodsSoftwareNUDIST",
            Q17_6: "qualMethodsSoftwareNVivo",
            Q17_7: "qualMethodsSoftwareOther",
            Q17_7_TEXT: "qualMethodsSoftwareOtherText",

            Q18: "participatoryMethods",
            Q18_1: "participatoryMethodsCommunityBased",
            Q18_2: "participatoryMethodsParticipatoryMapping",
            Q18_3: "participatoryMethodsParticipatoryPlanning",
            Q18_4: "participatoryMethodsOther",
            Q18_4_TEXT: "participatoryMethodsOtherText",

            Q19_1: "surveyDesignSurveyDesign",
            Q19_2: "surveyDesignSampling",
            Q19_3: "surveyDesignTelephone",
            Q19_4: "surveyDesignCATI",
            Q19_5: "surveyDesignInPerson",
            Q19_6: "surveyDesignInternet",
            Q19_7: "surveyDesignMail",
            Q19_8: "surveyDesignOther",
            Q19_8_TEXT: "surveyDesignOtherText",

            Q20_1: "performanceAnalysis",
            Q20_2: "performanceGrants",
            Q20_3: "performanceOther",
            Q20_3_TEXT: "performanceOtherText",
            Q20_6: "performancePresentingResearch",
            Q20_7: "performanceActivism",

            Q21_1: "documentaryDirect",
            Q21_2: "documentaryProduce",
            Q21_3: "documentaryEdit",
            Q21_4: "documentaryDistribute",
            Q21_5: "documentaryOther",
            Q21_5_TEXT: "documentaryOtherText",

            Q22_1: "exhibitionOrganize",
            Q22_2: "exhibitionOther",
            Q22_2_TEXT: "exhibitionOtherText",

            Q23_1: "otherMethodsArtifactAnalysis",
            Q23_2: "otherMethodsCostBenefitAnalysis",
            Q23_3: "otherMethodsDemographicProjections",
            Q23_4: "otherMethodsFiscalImpactAnalysis",
            Q23_5: "otherMethodsOther",
            Q23_5_TEXT: "otherMethodsOtherText",

            Q24_1: "otherTechnicalSkillsCartography",
            Q24_2: "otherTechnicalSkillsGIS",
            Q24_3: "otherTechnicalSkillsRemoteSensing",
            Q24_4: "otherTechnicalSkillsOther",
            Q24_4_TEXT: "otherTechnicalSkillsOtherText",

            Q25_1: "grantWritingCDC",
            Q25_2: "grantWritingContracts",
            Q25_3: "grantWritingEPA",
            Q25_4: "grantWritingNASA",
            Q25_5: "grantWritingNEA",
            Q25_6: "grantWritingNEH",
            Q25_7: "grantWritingNIH",
            Q25_8: "grantWritingNSF",
            Q25_9: "grantWritingState",
            Q25_10: "grantWritingFederal",
            Q25_11: "grantWritingLocal",
            Q25_12: "grantWritingUniversity",
            Q25_13: "grantWritingOther",
            Q25_13_TEXT: "grantWritingOtherText",

            Q26_1: "proposalReviewCDC",
            Q26_2: "proposalReviewEPA",
            Q26_3: "proposalReviewNASA",
            Q26_4: "proposalReviewNEA",
            Q26_5: "proposalReviewNEH",
            Q26_6: "proposalReviewNIH",
            Q26_7: "proposalReviewNSF",
            // Q26_8 not present
            Q26_9: "proposalReviewOther",
            Q26_9_TEXT: "proposalReviewOtherText",

            Q27_1: "fellowshipCASBS",
            Q27_2: "fellowshipFordFoundation",
            Q27_3: "fellowshipFulbright",
            Q27_4: "fellowshipLibraries",
            Q27_5: "fellowshipNSF",
            Q27_6: "fellowshipRobertWoodJohnson",
            Q27_7: "fellowshipSalzburg",
            Q27_8: "fellowshipStanfordHumanitiesCenter",
            Q27_9: "fellowshipWoodrowWilson",
            Q27_10: "fellowshipOther",
            Q27_10_TEXT: "fellowshipOtherText",

            Q28_1: "rscaProjectLeadTeams",
            Q28_2: "rscaProjectResearchManagement",
            Q28_3: "rscaProjectPostAwardManagement",
            Q28_4: "rscaProjectEthicalChallenges",
            Q28_5: "rscaProjectFederalAgenciesReporting",
            Q28_6: "rscaProjectOther",
            Q28_6_TEXT: "rscaProjectOtherText",

            Q29_1: "conferenceApplication",
            Q29_2: "conferencePresentation",
            Q29_3: "conferencePoster",
            Q29_4: "conferencePanel",
            Q29_5: "conferenceOrganization",
            Q29_6: "conferenceOther",
            Q29_6_TEXT: "conferenceOtherText",

            Q30_1: "studentResearchSuperviseStudentResearch",
            // Q30_2 not present
            Q30_3: "studentResearchServeOnThesisCommittee",
            Q30_4: "studentResearchChairThesisCommittee",
            Q30_5: "studentResearchSuperviseStudentAssistants",
            Q30_6: "studentResearchOther",
            Q30_6_TEXT: "studentResearchOtherText",

            Q31_1: "irbIacucIrbExempt",
            Q31_2: "irbIacucIrbExpedited",
            Q31_3: "irbIacucProtocolNarrative",
            Q31_4: "irbIacucInformedConsent",
            Q31_5: "irbIacucHumanSubjectsProtected",
            Q31_6: "irbIacucHumanSubjectsDeception",
            Q31_7: "irbIacucIacucApplication",
            Q31_8: "irbIacucOther",
            Q31_8_TEXT: "irbIacucOtherText"
        },
        toDependents = {
            book: [
                "bookProposal",
                "bookManuscript",
                "bookEdited",
                "bookTrade",
                "bookManual",
                "bookReference",
                "bookHandbook",
                "bookTextbook",
                "bookPopular",
                "bookOther"
            ],
            journal: [
                "journalSelecting",
                "journalReviewProcess",
                "journalReviewerComments",
                "journalRevising",
                "journalCoverLetter",
                "journalMultiauthorWriting",
                "journalMultiauthorReview",
                "journalOther"
            ],
            manuscriptPeerReview: [
                "manuscriptPeerReviewBecomeReviewer",
                "manuscriptPeerReviewChooseJournal",
                "manuscriptPeerReviewBestPractices",
                "manuscriptPeerReviewOther"
            ],
            opEd: [
                "opEdSelectingPublication",
                "opEdWriting",
                "opEdOther"
            ],
            bookReview: [
                "bookReviewWriting",
                "bookReviewValue",
                "bookReviewOther"
            ],
            journalEditor: [
                "journalEditorBecomeEditor",
                "journalEditorManageWorkload",
                "journalEditorAssignPeerReviewer",
                "journalEditorFindAdvisoryBoard",
                "journalEditorSpecialIssue",
                "journalEditorPlanContent",
                "journalEditorOther"
            ],
            quantMethodsStats: [
                "quantMethodsStatsOlsRegression",
                "quantMethodsStats2slsAnd3slsRegression",
                "quantMethodsStatsStructuralEquationModeling",
                "quantMethodsStatsTimeSeriesModeling",
                "quantMethodsStatsPoissonRegression",
                "quantMethodsStatsBinomialRegression",
                "quantMethodsStatsProbitRegression",
                "quantMethodsStatsBinaryLogisticRegression",
                "quantMethodsStatsMultinomialLogisticRegression",
                "quantMethodsStatsNestedLogisticRegression",
                "quantMethodsStatsMultilevelModeling",
                "quantMethodsStatsComputationalModeling",
                "quantMethodsStatsAgentbasedModeling",
                "quantMethodsStatsOther"
            ],
            quantMethodsResearch: [
                "quantMethodsResearchContentAnalysis",
                "quantMethodsResearchLabExperiments",
                "quantMethodsResearchLongitudinalResearch",
                "quantMethodsResearchMediationAndModeration",
                "quantMethodsResearchRegressionDiscontinuity",
                "quantMethodsResearchFieldExperiments",
                "quantMethodsResearchOther"
            ],
            quantMethodsSoftware: [
                "quantMethodsSoftwareAMOS",
                "quantMethodsSoftwareArcGIS",
                "quantMethodsSoftwareQGIS",
                "quantMethodsSoftwareQualtrics",
                "quantMethodsSoftwareIMAGINE",
                "quantMethodsSoftwareLIMDEP",
                "quantMethodsSoftwareMATLAB",
                "quantMethodsSoftwareR",
                "quantMethodsSoftwareSAS",
                "quantMethodsSoftwareStata",
                "quantMethodsSoftwareSPSS",
                "quantMethodsSoftwareZTree",
                "quantMethodsSoftwareOther"
            ],
            qualMethodsResearch: [
                "qualMethodsResearchArchival",
                "qualMethodsResearchCaseStudies",
                "qualMethodsResearchCommodityChain",
                "qualMethodsResearchContentAnalysis",
                "qualMethodsResearchEthnographic",
                "qualMethodsResearchFocusGroups",
                "qualMethodsResearchGaBiLifeCycleAssessment",
                "qualMethodsResearchInterviewsInDepth",
                "qualMethodsResearchInterviewsSemistructured",
                "qualMethodsResearchNRELSystemsAdvisorModel",
                "qualMethodsResearchOralHistory",
                "qualMethodsResearchParticipantObservation",
                "qualMethodsResearchPerformance",
                "qualMethodsResearchRhetoricalAnalysis",
                "qualMethodsResearchTextualAnalysis",
                "qualMethodsResearchOther"
            ],
            qualMethodsSoftware: [
                "qualMethodsSoftwareAtlasti",
                "qualMethodsSoftwareDedoose",
                "qualMethodsSoftwareQDAMiner",
                "qualMethodsSoftwareMAXQDA",
                "qualMethodsSoftwareNUDIST",
                "qualMethodsSoftwareNVivo",
                "qualMethodsSoftwareOther"
            ],
            participatoryMethods: [
                "participatoryMethodsCommunityBased",
                "participatoryMethodsParticipatoryMapping",
                "participatoryMethodsParticipatoryPlanning",
                "participatoryMethodsOther"
            ],
            surveyDesign: [
                "surveyDesignSurveyDesign",
                "surveyDesignSampling",
                "surveyDesignTelephone",
                "surveyDesignCATI",
                "surveyDesignInPerson",
                "surveyDesignInternet",
                "surveyDesignMail",
                "surveyDesignOther"
            ],
            performance: [
                "performanceAnalysis",
                "performanceGrants",
                "performancePresentingResearch",
                "performanceActivism",
                "performanceOther"
            ],
            documentary: [
                "documentaryDirect",
                "documentaryProduce",
                "documentaryEdit",
                "documentaryDistribute",
                "documentaryOther"
            ],
            exhibition: [
                "exhibitionOrganize",
                "exhibitionOther"
            ],
            otherMethods: [
                "otherMethodsArtifactAnalysis",
                "otherMethodsCostBenefitAnalysis",
                "otherMethodsDemographicProjections",
                "otherMethodsFiscalImpactAnalysis",
                "otherMethodsOther"
            ],
            otherTechnicalSkills: [
                "otherTechnicalSkillsCartography",
                "otherTechnicalSkillsGIS",
                "otherTechnicalSkillsRemoteSensing",
                "otherTechnicalSkillsOther"
            ],
            grantWriting: [
                "grantWritingCDC",
                "grantWritingContracts",
                "grantWritingEPA",
                "grantWritingNASA",
                "grantWritingNEA",
                "grantWritingNEH",
                "grantWritingNIH",
                "grantWritingNSF",
                "grantWritingState",
                "grantWritingFederal",
                "grantWritingLocal",
                "grantWritingUniversity",
                "grantWritingOther"
            ],
            proposalReview: [
                "proposalReviewCDC",
                "proposalReviewEPA",
                "proposalReviewNASA",
                "proposalReviewNEA",
                "proposalReviewNEH",
                "proposalReviewNIH",
                "proposalReviewNSF",
                "proposalReviewOther"
            ],
            fellowship: [
                "fellowshipCASBS",
                "fellowshipFordFoundation",
                "fellowshipFulbright",
                "fellowshipLibraries",
                "fellowshipNSF",
                "fellowshipRobertWoodJohnson",
                "fellowshipSalzburg",
                "fellowshipStanfordHumanitiesCenter",
                "fellowshipWoodrowWilson",
                "fellowshipOther"
            ],
            rscaProject: [
                "rscaProjectLeadTeams",
                "rscaProjectResearchManagement",
                "rscaProjectPostAwardManagement",
                "rscaProjectEthicalChallenges",
                "rscaProjectFederalAgenciesReporting",
                "rscaProjectOther"
            ],
            conference: [
                "conferenceApplication",
                "conferencePresentation",
                "conferencePoster",
                "conferencePanel",
                "conferenceOrganization",
                "conferenceOther"
            ],
            studentResearch: [
                "studentResearchSuperviseStudentResearch",
                "studentResearchServeOnThesisCommittee",
                "studentResearchChairThesisCommittee",
                "studentResearchSuperviseStudentAssistants",
                "studentResearchOther"
            ],
            irbIacuc: [
                "irbIacucIrbExempt",
                "irbIacucIrbExpedited",
                "irbIacucProtocolNarrative",
                "irbIacucInformedConsent",
                "irbIacucHumanSubjectsProtected",
                "irbIacucHumanSubjectsDeception",
                "irbIacucIacucApplication",
                "irbIacucOther"
            ]
        },
        toDescription = {
            book: "Writing Books",
            bookProposal: "Scholarly non-edited books (where a book proposal is submitted to secure a contract)",
            bookManuscript: "Scholarly non-edited books (where the entire manuscript is submitted to secure a contract)",
            bookEdited: "Scholarly edited books",
            bookTrade: "Trade books",
            bookManual: "Manuals",
            bookReference: "Reference volumes",
            bookHandbook: "Handbooks",
            bookTextbook: "Textbooks",
            bookPopular: "Popular books",

            journal: "Writing Journal Articles",
            journalSelecting: "Selecting a journal",
            journalReviewProcess: "Understanding manuscript review process",
            journalReviewerComments: "Responding to reviewers' and editor's comments",
            journalRevising: "Revising a manuscript",
            journalCoverLetter: "Preparing the cover letter (for initial and subsequent submissions)",
            journalMultiauthorWriting: "Coordinating multi-authored papers during the writing stage",
            journalMultiauthorReview: "Coordinating multi-authored papers during the peer-review stage",

            manuscriptPeerReview: "Peer Reviewing Manuscripts",
            manuscriptPeerReviewBecomeReviewer: "How to become a peer reviewer",
            manuscriptPeerReviewChooseJournal: "How to choose journals for peer review",
            manuscriptPeerReviewBestPractices: "How to write a good peer review/best practices for peer review",

            opEd: "Writing Op-eds",
            opEdSelectingPublication: "How to select a publication for an op-ed",
            opEdWriting: "How to write an op-ed",

            bookReview: "Book Reviews",
            bookReviewWriting: "How to write a book review",
            bookReviewValue: "Scholarly value of a book review",

            journalEditor: "Journal Editor",
            journalEditorBecomeEditor: "How to become a journal editor",
            journalEditorManageWorkload: "How to manage workload",
            journalEditorAssignPeerReviewer: "How to find and assign peer reviewers",
            journalEditorFindAdvisoryBoard: "How to find faculty for advisory board",
            journalEditorSpecialIssue: "How to plan and put together a special issue",
            journalEditorPlanContent: "How to plan for journal issues and content",

            quantMethodsStats: "Quantitative Methods: Statistical Tests",
            quantMethodsStatsOlsRegression: "Ordinary least squares (OLS) regression",
            quantMethodsStats2slsAnd3slsRegression: "Two- and three-stage least squares regression (2SLS and 3SLS)",
            quantMethodsStatsStructuralEquationModeling: "Structural equation modeling",
            quantMethodsStatsTimeSeriesModeling: "Time series modeling (e.g. VAR/SVAR/FAVAR, VEC, MLE)",
            quantMethodsStatsPoissonRegression: "Poisson regression",
            quantMethodsStatsBinomialRegression: "Binomial regression",
            quantMethodsStatsProbitRegression: "Probit regression",
            quantMethodsStatsBinaryLogisticRegression: "Binary logistic regression",
            quantMethodsStatsMultinomialLogisticRegression: "Multinomial logistic regression",
            quantMethodsStatsNestedLogisticRegression: "Nested logistic regression",
            quantMethodsStatsMultilevelModeling: "Multi-level modeling",
            quantMethodsStatsComputationalModeling: "Computational modeling",
            quantMethodsStatsAgentbasedModeling: "Agent-based modeling",

            quantMethodsResearch: "Quantitative Methods: Research Methods",
            quantMethodsResearchContentAnalysis: "Content analysis",
            quantMethodsResearchLabExperiments: "Lab experiments",
            quantMethodsResearchLongitudinalResearch: "Longitudinal research",
            quantMethodsResearchMediationAndModeration: "Mediation and moderation models",
            quantMethodsResearchRegressionDiscontinuity: "Regression discontinuity design",
            quantMethodsResearchFieldExperiments: "Field experiments",

            quantMethodsSoftware: "Quantitative Methods: Software",
            quantMethodsSoftwareAMOS: "AMOS",
            quantMethodsSoftwareArcGIS: "ArcGIS",
            quantMethodsSoftwareQGIS: "QGIS",
            quantMethodsSoftwareQualtrics: "Qualtrics",
            quantMethodsSoftwareIMAGINE: "IMAGINE (remote sensing software)",
            quantMethodsSoftwareLIMDEP: "LIMDEP",
            quantMethodsSoftwareMATLAB: "MATLAB",
            quantMethodsSoftwareR: "R",
            quantMethodsSoftwareSAS: "SAS",
            quantMethodsSoftwareStata: "STATA",
            quantMethodsSoftwareSPSS: "SPSS",
            quantMethodsSoftwareZTree: "Z Tree",

            qualMethodsResearch: "Qualitative Methods: Research Methods",
            qualMethodsResearchArchival: "Archival research",
            qualMethodsResearchCaseStudies: "Case studies",
            qualMethodsResearchCommodityChain: "Commodity chain analysis",
            qualMethodsResearchContentAnalysis: "Content analysis",
            qualMethodsResearchEthnographic: "Ethnographic studies",
            qualMethodsResearchFocusGroups: "Focus groups",
            qualMethodsResearchGaBiLifeCycleAssessment: "GaBi: Life cycle assessments",
            qualMethodsResearchInterviewsInDepth: "Interviews: in-depth",
            qualMethodsResearchInterviewsSemistructured: "Interviews: semi-structured",
            qualMethodsResearchNRELSystemsAdvisorModel: "NREL: Systems advisor model",
            qualMethodsResearchOralHistory: "Oral history",
            qualMethodsResearchParticipantObservation: "Participant observation",
            qualMethodsResearchPerformance: "Performance (as a research methodology)",
            qualMethodsResearchRhetoricalAnalysis: "Rhetorical analysis",
            qualMethodsResearchTextualAnalysis: "Textual analysis",

            qualMethodsSoftware: "Qualitative Methods: Software",
            qualMethodsSoftwareAtlasti: "Atlas.ti",
            qualMethodsSoftwareDedoose: "Dedoose",
            qualMethodsSoftwareQDAMiner: "QDA Miner",
            qualMethodsSoftwareMAXQDA: "MAXQDA",
            qualMethodsSoftwareNUDIST: "NUDIST",
            qualMethodsSoftwareNVivo: "NVivo",

            participatoryMethods: "Participatory Methods",
            participatoryMethodsCommunityBased: "Community-based participatory research",
            participatoryMethodsParticipatoryMapping: "Participatory mapping",
            participatoryMethodsParticipatoryPlanning: "Participatory planning",

            surveyDesign: "Survey Design",
            surveyDesignSurveyDesign: "Survey design (including questionnaire construction)",
            surveyDesignSampling: "Sampling",
            surveyDesignTelephone: "Conducting telephone surveys",
            surveyDesignCATI: "Conducting telephone surveys using CATI software",
            surveyDesignInPerson: "Conducting in-person surveys",
            surveyDesignInternet: "Conducting internet surveys",
            surveyDesignMail: "Conducting mail surveys",

            performance: "Performances",
            performanceAnalysis: "Analysis of performance or performance scholarship",
            performanceGrants: "Getting grants for performance-related work",
            performancePresentingResearch: "Performance as a method for presenting research",
            performanceActivism: "Performance as activism",

            documentary: "Documentaries",
            documentaryDirect: "Direct",
            documentaryProduce: "Produce",
            documentaryEdit: "Edit",
            documentaryDistribute: "Distribute",

            exhibition: "Exhibitions",
            exhibitionOrganize: "Organize",

            otherMethods: "Other Methods",
            otherMethodsArtifactAnalysis: "Artifact analysis (e.g., bone and textile dating)",
            otherMethodsCostBenefitAnalysis: "Cost-benefit analysis",
            otherMethodsDemographicProjections: "Demographic projections",
            otherMethodsFiscalImpactAnalysis: "Fiscal impact analysis",

            otherTechnicalSkills: "Other Technical Skills",
            otherTechnicalSkillsCartography: "Cartography",
            otherTechnicalSkillsGIS: "Geographic Information System (GIS)",
            otherTechnicalSkillsRemoteSensing: "Remote sensing",

            grantWriting: "Grant Writing (e.g., important things to consider while writing a grant; what are reviewers looking for?; and what is the role of a project manager?) for the following funding agencies:",
            grantWritingCDC: "CDC",
            grantWritingContracts: "Contracts (e.g., for local start-up companies)",
            grantWritingEPA: "EPA",
            grantWritingNASA: "NASA",
            grantWritingNEA: "NEA",
            grantWritingNEH: "NEH",
            grantWritingNIH: "NIH",
            grantWritingNSF: "NSF",
            grantWritingState: "State agencies",
            grantWritingFederal: "Federal agencies",
            grantWritingLocal: "Local governments",
            grantWritingUniversity: "Internal university and/or college",

            proposalReview: "Proposal review for the following funding agencies:",
            proposalReviewCDC: "CDC",
            proposalReviewEPA: "EPA",
            proposalReviewNASA: "NASA",
            proposalReviewNEA: "NEA",
            proposalReviewNEH: "NEH",
            proposalReviewNIH: "NIH",
            proposalReviewNSF: "NSF",

            fellowship: "Fellowships",
            fellowshipCASBS: "Center for Advanced Study and Behavioral Sciences at Stanford",
            fellowshipFordFoundation: "Ford Foundation",
            fellowshipFulbright: "Fulbright",
            fellowshipLibraries: "Libraries (e.g., Huntington Library and Newberry Library)",
            fellowshipNSF: "NSF (e.g., early career)",
            fellowshipRobertWoodJohnson: "Robert Wood Johnson Foundation",
            fellowshipSalzburg: "Salzburg",
            fellowshipStanfordHumanitiesCenter: "Stanford Humanities Center",
            fellowshipWoodrowWilson: "Woodrow Wilson National Fellowship Foundation",

            rscaProject: "Managing RSCA Projects",
            rscaProjectLeadTeams: "Lead teams",
            rscaProjectResearchManagement: "Research participant management (e.g., through SONA software)",
            rscaProjectPostAwardManagement: "Post-award financial management",
            rscaProjectEthicalChallenges: "Address ethical challenges or concerns",
            rscaProjectFederalAgenciesReporting: "Federal agencies reporting",

            conference: "Conferences",
            conferenceApplication: "Apply to present at a conference (e.g., preparing an abstract)",
            conferencePresentation: "Present at a conference",
            conferencePoster: "Prepare a poster",
            conferencePanel: "Organize a panel",
            conferenceOrganization: "Organize a conference",

            studentResearch: "Student Research",
            studentResearchSuperviseStudentResearch: "Supervise student research",
            studentResearchServeOnThesisCommittee: "Serve on a thesis committee",
            studentResearchChairThesisCommittee: "Chair a thesis committee",
            studentResearchSuperviseStudentAssistants: "Supervise student research assistants",

            irbIacuc: "Human Subjects and Institutional Review Board (IRB) and Institutional Animal Care & Use Committee (IACUC)",
            irbIacucIrbExempt: "IRB application (exempt category)",
            irbIacucIrbExpedited: "IRB application (expedited or full review)",
            irbIacucProtocolNarrative: "IRB protocol narrative",
            irbIacucInformedConsent: "Informed consent documentation (e.g., form, letter, and script)",
            irbIacucHumanSubjectsProtected: "Human subjects research involving protected classes of subjects (e.g., pregnant women, children, and prisoners)",
            irbIacucHumanSubjectsDeception: "Human subjects research involving deception",
            irbIacucIacucApplication: "IACUC application"
        },
        alwaysTrue = {share: 1};

    //==========================================================================
    //                               UTILITIES
    //==========================================================================

    //--------------------------------------------------------------------------
    //                               Iteration
    //--------------------------------------------------------------------------

    function each(collection, callback, context) {
        context = context || null;

        var x, limit = collection.length;

        if (typeof limit === "number") {
            for (x = 0; x < limit; x += 1) {
                if (callback.call(context,
                        collection[x], x, collection) === false) {
                    break;
                }
            }
        } else {
            for (x in collection) {
                if (collection.hasOwnProperty(x) &&
                        callback.call(context,
                            collection[x], x, collection) === false) {
                    break;
                }
            }
        }

        return collection;
    }

    function map(collection, callback, context) {
        var value;

        if (typeof collection.length === "number") {
            value = [];

            each(collection, function(item, i, collection) {
                value.push(callback.call(this, item, i, collection));
            }, context);
        } else {
            value = {};

            each(collection, function (item, key, collection) {
                value[key] = callback.call(this, item, key, collection);
            }, context);
        }

        return value;
    }

    function filter(collection, callback, context) {
        var value;

        if (typeof collection.length === "number") {
            value = [];

            each(collection, function (item, i, collection) {
                if (callback.call(this, item, i, collection)) {
                    value.push(item);
                }
            }, context);
        } else {
            value = {};

            each(collection, function (item, key, collection) {
                if (callback.call(this, item, key, collection)) {
                    value[key] = item;
                }
            }, context);
        }

        return value;
    }

    function reduce(collection, callback, accumulator, context) {
        each(collection, function(item, x, collection) {
            accumulator = callback.call(this, accumulator, item, x, collection);
        }, context);

        return accumulator;
    }

    function all(collection, callback, context) {
        var value = true;

        each(collection, function(item, x, collection) {
            value = !!callback.call(this, item, x, collection);
            return value;
        }, context);

        return value;
    }

    function some(collection, callback, context) {
        return !all(collection, function (item, x, collection) {
            return !callback.call(this, item, x, collection);
        }, context);
    }

    function buttons(callback, context) {
        each(document.getElementsByTagName("button"), callback, context);
    }

    //--------------------------------------------------------------------------
    //                          Object Manipulation
    //--------------------------------------------------------------------------

    function extend(target) {
        each(Array.prototype.slice.call(arguments, 1), function (source) {
            each(source, function (value, key) {
                target[key] = value;
            });
        });
        return target;
    }

    function contains(container, contained) {
        return all(contained, function (value, key) {
            return container[key] === value;
        });
    }

    function keys(object) {
        return reduce(object, function(accumulator, ignore, key) {
            return accumulator.concat([key]);
        }, []);
    }

    //--------------------------------------------------------------------------
    //                          String Manipulation
    //--------------------------------------------------------------------------

    function trim(string) {
        return string.
            replace(/\s+/g, " ").       // run of blanks --> single space
            replace(/^\s+|\s+$/g, "");  // no blanks at extremities
    }

    //--------------------------------------------------------------------------
    //                 A Datum to Aid in Name Alphabetization
    //--------------------------------------------------------------------------

    function alphabetizer(name) {
        var pattern = /^(.+?) ((?:(?:de(?: la)?|dei|del|della|des|di|du|la|le|les|lo|van(?: de(?:n|r))?|von) )?\S+)$/,
            match = pattern.exec(trim(name).toLowerCase());

        if (!match) {
            throw new Error("Could not parse name: " + name);
        }

        return [match[2].replace(/\s/g, "")].concat(match[1].split(" "));
    }

    function alphabetizerCompare(alphabetizer1, alphabetizer2) {
        var length1 = alphabetizer1.length,
            length2 = alphabetizer2.length,
            i;

        for (i = 0; i < length1 && i < length2; i += 1) {
            if (alphabetizer1[i] < alphabetizer2[i]) {
                return -1;
            }

            if (alphabetizer1[i] > alphabetizer2[i]) {
                return 1;
            }
        }

        return length1 - length2;
    }

    //--------------------------------------------------------------------------
    //                            DOM Node Classes
    //--------------------------------------------------------------------------

    function getClasses(element) {
        return (" " + element.className + " ").replace(/\s+/g, " ");
    }

    function setClasses(element, classes) {
        element.className = classes.replace(/^\s+|\s+$/g, "");
    }

    function hasClass(element, name) {
        return getClasses(element).indexOf(" " + name + " ") >= 0;
    }

    function addClass(element, name) {
        var classes = getClasses(element);

        if (classes.indexOf(" " + name + " ") < 0) {
            setClasses(element, classes + name);
        }
    }

    function removeClass(element, name) {
        name = " " + name + " ";

        var classes = getClasses(element);

        while (classes.indexOf(name) >= 0) {
            classes = classes.replace(name, " ");
        }

        setClasses(element, classes);
    }

    //--------------------------------------------------------------------------
    //                                 Events
    //--------------------------------------------------------------------------

    function listener(element, type, callback) {
        if (element.addEventListener) {
            element.addEventListener(type, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, callback);
        } // otherwise, just forget about it
    }

    function bind(callback, context) {
        return function () {
            return callback.apply(context, arguments);
        };
    }

    //--------------------------------------------------------------------------
    //                    Ajax for Reading in an XML File
    //--------------------------------------------------------------------------

    function xml(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 &&
                    ((xhr.status >= 200 && xhr.status < 300) ||
                        xhr.status === 304)) {
                callback(xhr.responseXML);
            }
        };
        xhr.open("GET", url, true);
        xhr.send(null);
    }

    //==========================================================================
    //                                  VIEW
    //==========================================================================

    function View(id) {
        if (arguments.length > 0) {
            this.element = document.getElementById(id);
        }
    }

    View.prototype.hide = function () {
        addClass(this.element, "hide");
        return this;
    };

    View.prototype.show = function () {
        removeClass(this.element, "hide");
        return this;
    };

    View.prototype.hidden = function () {
        return hasClass(this.element, "hide");
    };

    View.prototype.showIff = function (condition) {
        return condition ? this.show() : this.hide();
    };

    View.prototype.toggle = function () {
        return this.showIff(this.hidden());
    };

    View.prototype.fill = function (html) {
        this.element.innerHTML = html;
        return this;
    };

    View.prototype.listener = function (type, callback) {
        listener(this.element, type, callback);
        return this;
    };


    View.prototype.dispatch = function (type, interface) {
        interface = interface || "Events";

        var event;

        if (this.element.dispatchEvent) {
            try {  // preferred method
                event = new Event(type);
            } catch (error) {  // deprecated, but works in IE 9+
                event = document.createEvent(interface);
                event.initEvent(type, false, true);
            }
            this.element.dispatchEvent(event);
        } else {  // IE before version 9
            event = document.createEventObject();
            this.element.fireEvent("on" + type, event);
        }
    };

    //==========================================================================
    //                                KEY VIEW
    //==========================================================================

    function KeyView(id, key) {
        if (arguments.length > 0) {
            View.call(this, id);
            this.key = key;
        }
    }

    KeyView.prototype = new View();

    KeyView.prototype.showIff = function (properties) {
        var value = properties[this.key];

        View.prototype.showIff.call(this, value);
        return value;
    };

    //==========================================================================
    //                               GROUP VIEW
    //==========================================================================

    function GroupView(id, children) {
        if (arguments.length > 0) {
            View.call(this, id);
            this.children = children;
        }
    }

    GroupView.prototype = new View();

    GroupView.prototype.showIff = function (properties) {
        var value = reduce(this.children, function (exists, child) {
                return child.showIff(properties) || exists;
            }, false);

        View.prototype.showIff.call(this, value);
        return value;
    };

    //==========================================================================
    //                              COMPLEX VIEW
    //==========================================================================

    function ComplexView(id, key, group) {
        if (arguments.length > 0) {
            KeyView.call(this, id, key);
            this.group = group;
        }
    }

    ComplexView.prototype = new KeyView();

    ComplexView.prototype.showIff = function (properties) {
        var value = this.group.showIff(properties);

        return KeyView.prototype.showIff.call(this, properties) || value;
    };

    //==========================================================================
    //                               CONTROLLER
    //==========================================================================

    function Controller(xmlDocument) {
        this.menu = new Menu("expertise-menu");
        this.responses = new Responses(xmlDocument, "expertise-responses");
        this.back = new NavigatorButton("expertise-back-button");
        this.forward = new NavigatorButton("expertise-forward-button");

        var applyListener = bind(function() {
                this.back.push(this.current);
                this.back.concat(this.forward);
                this.forward.clear();
                this.current = this.menu.hide().properties();
                this.responses.populate(this.current).show();
            }, this),
            cancelListener = bind(function() {
                this.menu.hide();
                this.responses.show();
            }, this),
            searchListener = bind(function () {
                this.responses.hide();
                this.menu.clear().show();
            }, this),
            backListener = bind(function() {
                this.forward.push(this.current);
                this.current = this.back.pop();
                this.responses.populate(this.current);
            }, this),
            forwardListener = bind(function() {
                this.back.push(this.current);
                this.current = this.forward.pop();
                this.responses.populate(this.current);
            }, this);

        buttons(function (button) {
            if (hasClass(button, "expertise-apply")) {
                listener(button, "click", applyListener);
            } else if (hasClass(button, "expertise-cancel")) {
                listener(button, "click", cancelListener);
            } else if (hasClass(button, "expertise-search")) {
                listener(button, "click", searchListener);
            } else if (hasClass(button, "expertise-back")) {
                listener(button, "click", backListener);
            } else if (hasClass(button, "expertise-forward")) {
                listener(button, "click", forwardListener);
            }
        });
    }

    Controller.prototype.initialize = function () {
        this.current = this.menu.hide().clear().properties();
        this.back.clear();
        this.forward.clear();
        this.responses.populate(this.current).show();
    };

    //==========================================================================
    //                            NAVIGATOR BUTTON
    //==========================================================================

    function NavigatorButton(id) {
        View.call(this, id);
        this.stack = [];
    }

    NavigatorButton.prototype = new View();

    NavigatorButton.prototype.push = function (datum) {
        this.stack.push(datum);
        return this.adjust();
    };

    NavigatorButton.prototype.pop = function () {
        var datum = this.stack.pop();

        this.adjust();
        return datum;
    };

    NavigatorButton.prototype.concat = function (other) {
        this.stack = this.stack.concat(other.stack);
        return this.adjust();
    };

    NavigatorButton.prototype.clear = function () {
        this.stack = [];
        return this.adjust();
    };

    NavigatorButton.prototype.adjust = function () {
        var length = this.stack.length;

        this.showIff(length > 0);
        return length;
    };

    //==========================================================================
    //                                  MENU
    //==========================================================================

    function Menu(id) {
        View.call(this, id);
        this.items = new MenuItems();
        this.help = new View("expertise-menu-help");

        var clearListener = bind(function() {
                this.clear();
            }, this),
            helpListener = bind(function () {
                this.help.toggle();
            }, this);

        buttons(function (button) {
            if (hasClass(button, "expertise-menu-clear")) {
                listener(button, "click", clearListener);
            } else if (hasClass(button, "expertise-menu-help")) {
                listener(button, "click", helpListener);
            }
        });
    }

    Menu.prototype = new View();

    Menu.prototype.hide = function () {
        this.help.hide();
        return View.prototype.hide.call(this);
    };

    Menu.prototype.populate = function (properties) {
        this.items.populate(properties);
        return this;
    };

    Menu.prototype.clear = function () {
        return this.populate(alwaysTrue);
    };

    Menu.prototype.properties = function () {
        return extend(this.items.properties(), alwaysTrue);
    };

    //==========================================================================
    //                               MENU ITEMS
    //==========================================================================

    function MenuItems() {
        each(toDependents, function (dependents, key1) {
            this[key1] =
                new MainMenuItem(key1, map(dependents, function (key2) {
                    this[key2] = new MenuItem(key2);
                    return this[key2];
                }, this));
        }, this);
    }

    MenuItems.prototype.populate = function (properties) {
        each(this, function(item, key) {
            item.setChecked(properties[key]);
        });
    };

    MenuItems.prototype.properties = function () {
        return map(filter(this, function (item) {
            return item.getChecked();
        }), function (item) {
            return 1;
        });
    };

    //==========================================================================
    //                               MENU ITEM
    //==========================================================================

    function MenuItem(key) {
        if (arguments.length > 0) {
            View.call(this, key + "Checkbox");
        }
    }

    MenuItem.prototype = new View();

    MenuItem.prototype.getChecked = function () {
        return this.element.checked;
    };

    MenuItem.prototype.setChecked = function (value) {
        this.element.checked = !!value;
    };

    //==========================================================================
    //                             MAIN MENU ITEM
    //==========================================================================

    function MainMenuItem(key, dependents) {
        MenuItem.call(this, key);
        this.dependents = dependents;
        this.subcontainer = new View(key + "Dependents");

        this.listener("change", bind(function () {
            var value = this.getChecked();

            this.subcontainer.showIff(value);
            if (!value) {
                each(this.dependents, function (item) {
                    item.setChecked(false);
                });
            }
        }, this));
    }

    MainMenuItem.prototype = new MenuItem();

    MainMenuItem.prototype.setChecked = function (value) {
        MenuItem.prototype.setChecked.call(this, value);
        this.dispatch("change");
    };

    //==========================================================================
    //                                RESPONSES
    //==========================================================================

    function Responses(xmlDocument, id) {
        View.call(this, id);
        this.help = new View("expertise-responses-help");
        this.container = new View("expertise-responses-container");
        this.summary = new Summary("expertise-responses-summary");
        this.matches = new Matches("expertise-responses-matches");

        this.responses = map(xmlDocument.getElementsByTagName("Response"),
            function (xmlResponse) {
                return new Response(xmlResponse);
            }).sort(function (response1, response2) {
                return response1.compare(response2);
            });

        var helpListener = bind(function () {
                this.help.toggle();
            }, this);

        buttons(function (button) {
            if (hasClass(button, "expertise-responses-help")) {
                listener(button, "click", helpListener);
            }
        });

        this.container.listener("click", moreLessListener);
    }

    Responses.prototype = new View();

    Responses.prototype.hide = function () {
        this.help.hide();
        return View.prototype.hide.call(this);
    };

    Responses.prototype.populate = function (properties) {
        var responses = this.filter(properties);

        this.matches.update(responses.length);
        this.summary.showIff(properties);
        this.container.fill(this.html(responses));
        return this;
    };

    Responses.prototype.filter = function (properties) {
        return filter(this.responses, function (response) {
            return response.contains(properties);
        }, this);
    };

    Responses.prototype.html = function (responses) {
        return reduce(responses, function (accumulator, response) {
            return accumulator + response.html();
        }, "");
    };

    //==========================================================================
    //                                SUMMARY
    //==========================================================================

    function Summary(id) {
        function complex(key, dependents) {
            return new ComplexView(key + "Item", key, group(key, dependents));
        }

        function group(key, dependents) {
            return new GroupView(key + "Sublist", children(dependents));
        }

        function children(keys) {
            return map(keys, function (key) {
                return new KeyView(key + "Item", key);
            });
        }

        GroupView.call(this, id,
            reduce(toDependents, function (list, dependents, key) {
                return list.concat([complex(key, dependents)]);
            }, []));
    }

    Summary.prototype = new GroupView();

    //==========================================================================
    //                                MATCHES
    //==========================================================================

    function Matches(id) {
        View.call(this, id);
    }

    Matches.prototype = new View();

    Matches.prototype.update = function (n) {
        this.fill("" + n + " match" + (n === 1 ? "" : "es"));
    };

    //==========================================================================
    //                                 RESPONSE
    //==========================================================================

    function Response(xmlResponse) {
        var ELEMENT = 1;

        // Collect element nodes, ignoring useless nodes.
        function elements(nodes) {
            return filter(nodes, function(node) {
                return node.nodeType === ELEMENT;
            });
        }

        // Go through the element children of node. Each such child will have an
        // XML form along the following lines:
        //
        // <key>value</key>
        //
        // For each such XML node, invoke the callback on the strings "key" and
        // "value".
        function keyValuePairs(node, callback, context) {
            each(elements(node.childNodes), function (child) {
                callback.call(this, child.nodeName,
                    child.textContent || child.innerText);  // innerText for IE
            }, context);
        }

        // Change values into integers where possible.
        function parseValue(string) {
            return /^\-?\d+$/.test(string) ? parseInt(string, 10) : string;
        }

        // Add key-value pairs specified in xmlResponse:
        keyValuePairs(xmlResponse, function (qualtricsKey, value) {
            // Translate random Qualtrics keys into meaningful keys.
            var key = toKey[qualtricsKey];

            // Test key and value. If toKey does not provide a translation--
            // i.e. key is undefined and falsy--we are not interested in that
            // key-value pair. If value is "", which is falsy, then the
            // corresponding node in xmlResponse was empty and does not need to
            // be carried over. Test value before parsing! "0" is truthy, but 0
            // is falsy!
            if (key && value) {
                this[key] = parseValue(value);
            }
        }, this);

        // Extend the set of key-value pairs:
        // The keys in the range of toKey fall into thematic groups, and these
        // groups form the range of toDependents. The domain of toDependents is
        // a set of "thematic" keys representing the overarching themes of those
        // thematic groups. For each thematic key in toDependents, add that key
        // with a value of 1, if there is a key from the corresponding thematic
        // group--the "dependents"--that wound up with a truthy value as a
        // result of the loop above. Thus, logically, the thematic key
        // represents the disjunction of the dependents. If any thematic key
        // turns out to get the value 1, add the the key expertise with value 1.
        // Logically, the expertise key represents the disjunction of the
        // thematic keys.
        each(toDependents, function(dependents, key1) {
            if (some(dependents, function (key2) {
                    return this[key2];
                }, this)) {
                this[key1] = 1;
                this.expertise = 1;
            }
        }, this);

        // Add an alphabetiser based on the name which will have been provided
        // in the xmlResponse and stored as this.name by the first loop above.
        this.alphabetizer = alphabetizer(this.name);
    }

    Response.prototype.getName = function () {
        return trim(this.name || "&nbsp;");
    };

    Response.prototype.getEmail = function () {
        return trim(this.email || "&nbsp;").toLowerCase();
    };

    Response.prototype.getRank = function () {
        switch (this.rank) {
            case 1:
                return "Assistant Professor";
            case 2:
                return "Associate Professor";
            case 3:
                return "Professor";
            case 4:
                return "Lecturer";
        }

        return trim(this.rankText || "&nbsp;");
    };

    Response.prototype.getDepartment = function () {
        switch (this.department) {
            case 1:
                return "African American Studies";
            case 2:
                return "Anthropology";
            case 3:
                return "Communication Studies";
            case 4:
                return "Economics";
            case 5:
                return "Environmental Studies";
            case 6:
                return "Geography and Global Studies";
            case 7:
                return "History";
            case 8:
                return "Mexican American Studies";
            case 9:
                return "Political Science";
            case 10:
                return "Psychology";
            case 11:
                return "Sociology and Interdisciplinary Social Sciences";
            case 12:
                return "Urban and Regional Planning";
        }

        return trim(this.departmentText || "&nbsp;");
    };

    Response.prototype.compare = function (other) {
        return alphabetizerCompare(this.alphabetizer, other.alphabetizer);
    };

    Response.prototype.contains = function(properties) {
        return contains(this, properties);
    };

    Response.prototype.html = function () {
        if (!this.cache) {
            this.cache =
                '<div id="' + this.id + '" class="response nowrap less">' +
                this.nameEmailBlock() +
                this.rankDepartmentBlock() +
                this.expertiseBlock() +
                "</div>";
        }

        return  this.cache;
    };

    Response.prototype.nameEmailBlock = function () {
        var email = this.getEmail();

        return '<div class="nowrap wd-250 float-left">' +
            '<p><span class="highlight">' + this.getName() + "</span><br />" +
            '<a href="mailto:' + email + '">' + email + "</a></p>" +
            "</div>";
    };

    Response.prototype.rankDepartmentBlock = function () {
        return '<div class="nowrap wd-390 float-right">' +
            this.moreLessBlock() +
            "<p>" + this.getRank() + "<br />" +
            this.getDepartment() + "</p>" +
            "</div>";
    };

    Response.prototype.moreLessBlock = function () {
        return this.expertise ?
            '<div class="float-right">' +
            '<button id="more-' + this.id + '" class="more">SHOW MORE</button>' +
            '<button id="less-' + this.id + '" class="less">SHOW LESS</button>' +
            "</div>" :
            "";
    };

    Response.prototype.expertiseBlock = (function () {
        function existingGroups(callback, context) {
            return reduce(toDependents,
                function (accumulator, dependents, key) {
                    return accumulator +
                        (this[key] ? callback.call(this, key, dependents) : "");
                }, "", context);
        }

        function existingKeys(collection, callback, context) {
            return reduce(collection, function (accumulator, key) {
                return accumulator +
                    (this[key] ? callback.call(this, key) : "");
            }, "", context);
        }

        return function () {
            return this.expertise ?
                '<div class="expertise clear nowrap">' +
                existingGroups(function (key1, dependents) {
                    return "<p>" + toDescription[key1] + "</p>" +
                        "<ul>" +
                        existingKeys(dependents, function (key2) {
                            return "<li>" + (toDescription[key2] ||
                                this[key2 + "Text"]) + "</li>";
                        }, this) +
                        "</ul>";
                }, this) +
                "</div>" :
                "";
        };
    }());

    function moreLessListener(event) {
        event = event || window.event;

        var target = event.target || event.srcElement, match, div;

        if (target && target.id) {
            match = /^(more|less)\-(.+?)$/.exec(target.id);

            if (match) {
                div = document.getElementById(match[2]);

                if (div) {
                    (match[1] === "more" ? removeClass : addClass)(div, "less");
                }
            }
        }
    }

    //==========================================================================
    //                                 EXPOSED
    //==========================================================================

    my.setup = function (url) {
        xml(url, function (xmlDocument) {
            (new Controller(xmlDocument)).initialize();
        });
    };

    return my;

}(CoSS.exprt || {}, this));
