/*
 * exprt.js
 *
 * Michael T. Wescoat
 * College of Social Sciences
 * San Jose State Univiersity
 * October 2017
 *
 */

var CoSS = this.CoSS || {};

CoSS.exprt = (function (my, window) {
    "use strict";

    var document = window.document,
        toKey = {
            ResponseID: "id",

            Q2: "emailText",
            Q3: "nameText",
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
            Q9_4: "manuscriptPeerReviewOther",
            Q9_4_TEXT: "manuscriptPeerReviewOtherText",

            Q10_1: "opEdSelectingPublication",
            Q10_2: "opEdWriting",
            Q10_3: "opEdOther",
            Q10_3_TEXT: "opEdOtherText",

            Q11_1: "bookReviewWriting",
            Q11_2: "bookReviewValue",
            Q11_3: "bookReviewOther",
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
            Q13_14: "quantMethodsStatsOther",
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

            Q16_1: "qualMethodsResearchArchival",
            Q16_2: "qualMethodsResearchCaseStudies",
            Q16_3: "qualMethodsResearchCommodityChain",
            Q16_4: "qualMethodsResearchContentAnalysis",
            Q16_5: "qualMethodsResearchEthnographic",
            Q16_6: "qualMethodsResearchFocusGroups",
            Q16_7: "qualMethodsResearchGaBiLifeCycleAssessment",
            Q16_8: "qualMethodsResearchInterviewsInDepth",
            Q16_9: "qualMethodsResearchInterviewsSemistructured",
            Q16_10: "qualMethodsResearchNRELSystemsAdvisorModel",
            Q16_11: "qualMethodsResearchOralHistory",
            Q16_12: "qualMethodsResearchParticipantObservation",
            Q16_13: "qualMethodsResearchPerformance",
            Q16_14: "qualMethodsResearchRhetoricalAnalysis",
            Q16_15: "qualMethodsResearchTextualAnalysis",
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
            book: "Writing Books*",
            bookProposal: "Scholarly non-edited books (where a book proposal is submitted to secure a contract)",
            bookManuscript: "Scholarly non-edited books (where the entire manuscript is submitted to secure a contract)",
            bookEdited: "Scholarly edited books",
            bookTrade: "Trade books",
            bookManual: "Manuals",
            bookReference: "Reference volumes",
            bookHandbook: "Handbooks",
            bookTextbook: "Textbooks",
            bookPopular: "Popular books",

            journal: "Writing Journal Articles*",
            journalSelecting: "Selecting a journal",
            journalReviewProcess: "Understanding manuscript review process",
            journalReviewerComments: "Responding to reviewers' and editor's comments",
            journalRevising: "Revising a manuscript",
            journalCoverLetter: "Preparing the cover letter (for initial and subsequent submissions)",
            journalMultiauthorWriting: "Coordinating multi-authored papers during the writing stage",
            journalMultiauthorReview: "Coordinating multi-authored papers during the peer-review stage",

            manuscriptPeerReview: "Peer Reviewing Manuscripts*",
            manuscriptPeerReviewBecomeReviewer: "How to become a peer reviewer",
            manuscriptPeerReviewChooseJournal: "How to choose journals for peer review",
            manuscriptPeerReviewBestPractices: "How to write a good peer review/best practices for peer review",

            opEd: "Writing Op-eds*",
            opEdSelectingPublication: "How to select a publication for an op-ed",
            opEdWriting: "How to write an op-ed",

            bookReview: "Writing Book Reviews*",
            bookReviewWriting: "How to write a book review",
            bookReviewValue: "Scholarly value of a book review",

            journalEditor: "Journal Editorship*",
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

            grantWriting: "Grant Writing<!-- (e.g., important things to consider while writing a grant; what are reviewers looking for?; and what is the role of a project manager?) for the following funding agencies:-->",
            grantWritingCDC: "For CDC",
            grantWritingContracts: "For contracts (e.g., for local start-up companies)",
            grantWritingEPA: "For EPA",
            grantWritingNASA: "For NASA",
            grantWritingNEA: "For NEA",
            grantWritingNEH: "For NEH",
            grantWritingNIH: "For NIH",
            grantWritingNSF: "For NSF",
            grantWritingState: "For state agencies",
            grantWritingFederal: "For federal agencies",
            grantWritingLocal: "For local governments",
            grantWritingUniversity: "Internal university and/or college",

            proposalReview: "Proposal Review<!-- for the Following Funding Agencies:-->",
            proposalReviewCDC: "For CDC",
            proposalReviewEPA: "For EPA",
            proposalReviewNASA: "For NASA",
            proposalReviewNEA: "For NEA",
            proposalReviewNEH: "For NEH",
            proposalReviewNIH: "For NIH",
            proposalReviewNSF: "For NSF",

            fellowship: "Fellowships*",
            fellowshipCASBS: "Center for Advanced Study and Behavioral Sciences at Stanford",
            fellowshipFordFoundation: "Ford Foundation",
            fellowshipFulbright: "Fulbright",
            fellowshipLibraries: "Libraries (e.g., Huntington Library and Newberry Library)",
            fellowshipNSF: "NSF (e.g., early career)",
            fellowshipRobertWoodJohnson: "Robert Wood Johnson Foundation",
            fellowshipSalzburg: "Salzburg",
            fellowshipStanfordHumanitiesCenter: "Stanford Humanities Center",
            fellowshipWoodrowWilson: "Woodrow Wilson National Fellowship Foundation",

            rscaProject: "Managing RSCA Projects*",
            rscaProjectLeadTeams: "Lead teams",
            rscaProjectResearchManagement: "Research participant management (e.g., through SONA software)",
            rscaProjectPostAwardManagement: "Post-award financial management",
            rscaProjectEthicalChallenges: "Address ethical challenges or concerns",
            rscaProjectFederalAgenciesReporting: "Federal agencies reporting",

            conference: "Conferences*",
            conferenceApplication: "Apply to present at a conference (e.g., preparing an abstract)",
            conferencePresentation: "Present at a conference",
            conferencePoster: "Prepare a poster",
            conferencePanel: "Organize a panel",
            conferenceOrganization: "Organize a conference",

            studentResearch: "Student Research*",
            studentResearchSuperviseStudentResearch: "Supervise student research",
            studentResearchServeOnThesisCommittee: "Serve on a thesis committee",
            studentResearchChairThesisCommittee: "Chair a thesis committee",
            studentResearchSuperviseStudentAssistants: "Supervise student research assistants",

            irbIacuc: "Human Subjects and Institutional Review Board (IRB) and Institutional Animal Care & Use Committee (IACUC)*",
            irbIacucIrbExempt: "IRB application (exempt category)",
            irbIacucIrbExpedited: "IRB application (expedited or full review)",
            irbIacucProtocolNarrative: "IRB protocol narrative",
            irbIacucInformedConsent: "Informed consent documentation (e.g., form, letter, and script)",
            irbIacucHumanSubjectsProtected: "Human subjects research involving protected classes of subjects (e.g., pregnant women, children, and prisoners)",
            irbIacucHumanSubjectsDeception: "Human subjects research involving deception",
            irbIacucIacucApplication: "IACUC application"
        },
        toOtherText = {
            bookOther: "bookOtherText",
            journalOther: "journalOtherText",
            manuscriptPeerReviewOther: "manuscriptPeerReviewOtherText",
            opEdOther: "opEdOtherText",
            bookReviewOther: "bookReviewOtherText",
            journalEditorOther: "journalEditorOtherText",
            quantMethodsStatsOther: "quantMethodsStatsOtherText",
            quantMethodsResearchOther: "quantMethodsResearchOtherText",
            quantMethodsSoftwareOther: "quantMethodsSoftwareOtherText",
            qualMethodsResearchOther: "qualMethodsResearchOtherText",
            qualMethodsSoftwareOther: "qualMethodsSoftwareOtherText",
            participatoryMethodsOther: "participatoryMethodsOtherText",
            surveyDesignOther: "surveyDesignOtherText",
            performanceOther: "performanceOtherText",
            documentaryOther: "documentaryOtherText",
            exhibitionOther: "exhibitionOtherText",
            otherMethodsOther: "otherMethodsOtherText",
            otherTechnicalSkillsOther: "otherTechnicalSkillsOtherText",
            grantWritingOther: "grantWritingOtherText",
            proposalReviewOther: "proposalReviewOtherText",
            fellowshipOther: "fellowshipOtherText",
            rscaProjectOther: "rscaProjectOtherText",
            conferenceOther: "conferenceOtherText",
            studentResearchOther: "studentResearchOtherText",
            irbIacucOther: "irbIacucOtherText"
        },
        toButtons = reduce(document.getElementsByTagName("BUTTON"),
            function (mapping, element) {
                each(mapping, function (elements, name) {
                    var value = hasClass(element, name);

                    if (value) {
                        elements.push(element);
                    }
                    return !value;  // Break after first (and only) hit.
                });
                return mapping;
            }, {
                expertiseApply: [],
                expertiseClear: [],
                expertiseCancel: [],
                expertiseNewSearch: [],
                expertiseEditSearch : [],
                expertiseBack: [],
                expertiseForward: [],
                expertiseMenuHelp: [],
                expertiseResponsesHelp: []
            }),
        toSpans = reduce(document.getElementsByTagName("SPAN"),
            function (mapping, element) {
                each(mapping, function (elements, name) {
                    var value = hasClass(element, name);

                    if (value) {
                        elements.push(element);
                    }
                    return !value;  // Break after first (and only) hit.
                });
                return mapping;
            }, {
                expertiseApply: [],
                expertiseClear: [],
                expertiseCancel: []
            }),
        alwaysTrue = {share: 1},
        viewDecoratorMixin;


    // var toKeysRange =
    //         reduce(toKey, function (array, key) {
    //             return array.concat([key]);
    //         }, []),
    //     toDependentsDomain =
    //         reduce(toDependents, function (array, dependents, key) {
    //             return array.concat([key]);
    //         }, []),
    //     toDependentsRangeFlattened =
    //         reduce(toDependents, function (array, dependents) {
    //             return array.concat(dependents);
    //         }, []),
    //     toDescriptionDomain =
    //         reduce(toDescription, function (array, description, key) {
    //             return array.concat([key]);
    //         }, []),
    //     toOtherTextDomain =
    //         reduce(toOtherText, function (array, otherText, other) {
    //             return array.concat([other]);
    //         }, []),
    //     toOtherTextRange =
    //         reduce(toOtherText, function (array, otherText) {
    //             return array.concat([otherText]);
    //         }, []),
    //     specialKeys =
    //         [
    //             "id",
    //             "emailText",
    //             "nameText",
    //             "share",
    //             "rank",
    //             "rankText",
    //             "department",
    //             "departmentText"
    //         ];


    // function member(string1, array) {
    //     return some(array, function (string2) {
    //         return string1 === string2;
    //     });
    // }

    // function setDiff(array1, array2) {
    //     return filter(array1, function (string) {
    //         return !member(string, array2);
    //     });
    // }

    // function subset(array1, array2) {
    //     return all(array1, function (string) {
    //         return member(string, array2);
    //     });
    // }

    // function setEqual(array1, array2) {
    //     return subset(array1, array2) && subset(array2, array1);
    // }

    // function union(array1, array2) {
    //     return array1.concat(array2);
    // }

    // function disjoint(array1, array2) {
    //     return !some(array1, function (string) {
    //         return member(string, array2);
    //     });
    // }


    // console.log("Checking assumptions about keys in exprt.js -- " +
    //     "any warnings follow:");


    // if (!disjoint(specialKeys, toDependentsDomain)) {
    //     console.log("Special keys and thematic keys not disjoint");
    // }
    // if (!disjoint(specialKeys, toDependentsRangeFlattened)) {
    //     console.log("Special keys and dependents not disjoint");
    // }
    // if (!disjoint(specialKeys, toDescriptionDomain)) {
    //     console.log("Special keys and range of toDescription not disjoint");
    // }
    // if (!disjoint(specialKeys, toOtherTextDomain)) {
    //     console.log("Special keys and ...Other keys not disjoint");
    // }
    // if (!disjoint(specialKeys, toOtherTextRange)) {
    //     console.log("Special keys and ...OtherText keys not disjoint");
    // }


    // if (!disjoint(toOtherTextRange, toDependentsDomain)) {
    //     console.log("...OtherText keys and thematic keys not disjoint");
    // }
    // if (!disjoint(toOtherTextRange, toDependentsRangeFlattened)) {
    //     console.log("...OtherText keys and dependents not disjoint");
    // }
    // if (!disjoint(toOtherTextRange, toDescriptionDomain)) {
    //     console.log("...OtherText keys and " +
    //         "domain of toDescription not disjoint");
    // }
    // if (!disjoint(toOtherTextRange, toOtherTextDomain)) {
    //     console.log("...OtherText keys and ...Other keys not disjoint");
    // }


    // if (!disjoint(toOtherTextDomain, toDependentsDomain)) {
    //     console.log("...OtherText keys and thematic keys not disjoint");
    // }
    // if (!disjoint(toOtherTextDomain, toDescriptionDomain)) {
    //     console.log("...OtherText keys and ...Other keys not disjoint");
    // }


    // if (!disjoint(toDependentsRangeFlattened, toDependentsDomain)) {
    //     console.log("Dependents and thematic keys not disjoint");
    // }


    // if (!disjoint(toDependentsDomain, toKeysRange)) {
    //     console.log("Thematic keys and range of toKeys not disjoint");
    // }


    // if (!setEqual(toKeysRange, union(specialKeys,
    //         union(toDependentsRangeFlattened, toOtherTextRange)))) {
    //     console.log("Range of toKeys not equal to union " +
    //         "of special keys, dependents, and ...OtherText keys");
    // }


    // if (!setEqual(toDescriptionDomain,
    //         setDiff(union (toDependentsDomain, toDependentsRangeFlattened),
    //             toOtherTextDomain))) {
    //     console.log("The domain of toDescription not equal to union of " +
    //         "thematic keys and dependents minus the domain of toOtherText");
    // }


    // if (!setEqual(toDependentsRangeFlattened,
    //         setDiff(toKeysRange, union(specialKeys, toOtherTextRange)))) {
    //     console.log("Dependents not equal to the range of toKeys minus " +
    //         "the union of special keys and ...OtherText keys");
    // }

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

    function sum(collection, callback, context) {
        return reduce(collection, function (accumulator, item, x, collection) {
            return accumulator + callback.call(this, item, x, collection);
        }, 0, context);
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

    //--------------------------------------------------------------------------
    //                          String Manipulation
    //--------------------------------------------------------------------------

    function trim(string) {
        return string.
            replace(/\s+/g, " ").       // run of blanks --> single space
            replace(/^\s+|\s+$/g, "");  // no blanks at extremities
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //--------------------------------------------------------------------------
    //                 A Datum to Aid in Name Alphabetization
    //--------------------------------------------------------------------------

    function alphabetizer(name) {
        var match = /^(.+?) ((?:(?:de(?: la)?|dei|del|della|des|di|du|la|le|les|lo|van(?: de(?:n|r))?|von) )?\S+)$/.
                exec(name.toLowerCase());

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
        } else {
            element.attachEvent("on" + type, callback);
        }
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

    /**
     * View provides basic functionality to an associated DOM element. The
     * element is retrieved by id.
     */
    function View(id) {
        this.element = document.getElementById(id);
    }

    /**
     * Adds the class "hide" to element. In CSS: ".hide { display: none; }"
     * Returns this, to facilitate chaining.
     */
    View.prototype.hide = function () {
        addClass(this.element, "hide");
        return this;
    };

    /**
     * Removes the class "hide" from element, allowing it to display normally.
     * Returns this, to facilitate chaining.
     */
    View.prototype.show = function () {
        removeClass(this.element, "hide");
        return this;
    };

    /**
     * Holds iff element has the "hide" class.
     */
    View.prototype.hidden = function () {
        return hasClass(this.element, "hide");
    };

    /**
     * Shows element if condition holds and hides it if condition fails.
     * Returns the number of elements shown, i.e. 0 or 1.
     */
    View.prototype.showIff = function (condition) {
        var value = condition ? 1 : 0;

        if (value > 0) {
            this.show();
        } else {
            this.hide();
        }
        return value;
    };

    /**
     * Shows element if it is hidden, and hides it if it is not hidden.
     * Returns this, to facilitate chaining.
     */
    View.prototype.toggle = function () {
        this.showIff(this.hidden());
        return this;
    };

    /**
     * Makes html the new content of element.
     * Returns this, to facilitate chaining.
     */
    View.prototype.fill = function (html) {
        this.element.innerHTML = html;
        return this;
    };

    /**
     * Adds callback to element as a listener for events of type.
     * Returns this, to facilitate chaining.
     */
    View.prototype.on = function (type, callback) {
        listener(this.element, type, callback);
        return this;
    };

    View.prototype.getChecked = function () {
        return this.element.checked;
    };

    View.prototype.setChecked = function (value) {
        this.element.checked = value;
    };

    //==========================================================================
    //                          VIEW DECORATOR MIXIN
    //==========================================================================

    viewDecoratorMixin = {
        hide: function () {
            this.view.hide();
            return this;
        },
        show: function () {
            this.view.show();
            return this;
        },
        hidden: function () {
            return this.view.hidden();
        },
        showIff: function (condition) {
            return this.view.showIff(condition);
        },
        toggle: function () {
            this.view.toggle();
            return this;
        },
        fill: function (html) {
            this.view.fill(html);
            return this;
        },
        on: function (type, callback) {
            this.view.on(type, callback);
            return this;
        },
        getChecked: function () {
            return this.view.getChecked();
        },
        setChecked: function (value) {
            this.view.setChecked(value);
        }
   };

    //==========================================================================
    //                               MULTIVIEW
    //==========================================================================

    /**
     * Multiview is basically a View for multiple DOM elements. The elements
     * are all spans selected by class name, using the toSpans mapping.
     */
    function Multiview(name) {
        this.elements = toSpans[name];
    }

    /**
     * Hides all elements by adding the class "hide" to each. Returns this.
     */
    Multiview.prototype.hide = function () {
        each(this.elements, function (element) {
            addClass(element, "hide");
        });
        return this;
    };

    /**
     * Shows all elements by removing the class "hide" from each. Returns this.
     */
   Multiview.prototype.show = function () {
        each(this.elements, function (element) {
            removeClass(element, "hide");
        });
        return this;
    };

    /**
     * Takes a single argument, condition. Shows all elements if
     # condition holds. Otherwise hides them all. Returns this.
     */
    Multiview.prototype.showIff = function (condition) {
        return condition ? this.show() : this.hide();
    };

    //==========================================================================
    //                            NAVIGATOR BUTTON
    //==========================================================================

    function NavigatorButton(id) {
        this.view = new View(id);
        this.stack = [];
    }

    extend(NavigatorButton.prototype, viewDecoratorMixin);

    NavigatorButton.prototype.push = function (datum) {
        this.stack.push(datum);
        return this.show();
    };

    NavigatorButton.prototype.pop = function () {
        var datum = this.stack.pop();

        this.showIff(this.size()  > 0);
        return datum;
    };

    NavigatorButton.prototype.concat = function (other) {
        this.stack = this.stack.concat(other.stack);
        this.showIff(this.size()  > 0);
        return this;
    };

    NavigatorButton.prototype.clear = function () {
        this.stack = [];
        return this.hide();
    };

    NavigatorButton.prototype.size = function () {
        return this.stack.length;
    };

    //==========================================================================
    //                                CHECKBOX
    //==========================================================================

    function Checkbox(id, key, callback) {
        this.view = new View(id);
        this.key = key;
        this.on("change", callback);
    }

    extend(Checkbox.prototype, viewDecoratorMixin);

    Checkbox.prototype.populate = function (properties) {
        var value = !!properties[this.key];

        this.setChecked(value);
        return value;
    };

    Checkbox.prototype.properties = function () {
        var properties = {};

        if (this.getChecked()) {
            properties[this.key] = 1;
        }
        return properties;
    };

    //==========================================================================
    //                             CHECKBOX GROUP
    //==========================================================================

    function CheckboxGroup(id, children) {
        this.view = new View(id);
        this.children = children || [];
    }

    extend(CheckboxGroup.prototype, viewDecoratorMixin);

    CheckboxGroup.prototype.addChild = function (checkbox) {
        this.children.push(checkbox);
    };

    CheckboxGroup.prototype.populate = function (properties) {
        return reduce(this.children, function (exists, child) {
            return child.populate(properties) || exists;
        }, false);
    };

    CheckboxGroup.prototype.properties = function () {
        return reduce(this.children, function (properties, child) {
            return extend(properties, child.properties());
        }, {});
    };

    //==========================================================================
    //                            CHECKBOX COMPLEX
    //==========================================================================

    function CheckboxComplex(id, key, callback, group) {
        this.view = new Checkbox(id, key, callback);
        this.group = group;
        this.on("change", bind(function () {
            // Repopulate group only if this checkbox is unchecked.
            // I.e., the populate statement must be the second disjunct.
            this.group.showIff(this.getChecked() ||
                this.group.populate(alwaysTrue));
        }, this));
    }

    extend(CheckboxComplex.prototype, viewDecoratorMixin);

    CheckboxComplex.prototype.populate = function (properties) {
        var value = this.view.populate(properties);

        // The form of the disjunction is designed to make sure that both
        // populate statements are invoked. The variable disjunct must be last.
        value = this.group.populate(properties) || value;
        this.group.showIff(value);
        return value;
    };

    CheckboxComplex.prototype.properties = function () {
        return extend(this.view.properties(), this.group.properties());
    };

    //==========================================================================
    //                                  MENU
    //==========================================================================

    function Menu(id) {
        function complex(key, callback, dependents) {
            return new CheckboxComplex(key + "Checkbox",
                key, callback, group(key, callback, dependents));
        }

        function group(key, callback, dependents) {
            return new CheckboxGroup(key + "Dependents",
                map(dependents, function (dependent) {
                    return simple(dependent, callback);
                }));
        }

        function simple(key, callback) {
            return new Checkbox(key + "Checkbox", key, callback);
        }

        var checkboxListener = bind(function () {
                var nonempty = !contains(alwaysTrue, this.properties());

                this.applies.showIff(nonempty);
                this.clears.showIff(nonempty);
            }, this),
            clearListener = bind(function () {
                this.clear();
            }, this),
            helpListener = bind(function () {
                this.help.toggle();
            }, this);

        this.applies = new Multiview("expertiseApply");
        this.clears = new Multiview("expertiseClear");
        this.help = new View("expertiseMenuHelp");
        this.view = new CheckboxGroup(id);
        each(toDependents, function (dependents, key) {
            this.view.addChild(complex(key, checkboxListener, dependents));
        }, this);

        each(toButtons.expertiseClear, function (button) {
            listener(button, "click", clearListener);
        });
        each(toButtons.expertiseMenuHelp, function (button) {
            listener(button, "click", helpListener);
        });
    }

    extend(Menu.prototype, viewDecoratorMixin);

    Menu.prototype.hide = function () {
        this.help.hide();
        return this.view.hide();
    };

    Menu.prototype.populate = function (properties) {
        var nonempty = !contains(alwaysTrue, properties);

        this.applies.showIff(nonempty);
        this.clears.showIff(nonempty);
        this.view.populate(properties);
        return this;
    };

    Menu.prototype.clear = function () {
        return this.populate(alwaysTrue);
    };

    Menu.prototype.properties = function () {
        return extend(this.view.properties(), alwaysTrue);
    };

    //==========================================================================
    //                                KEY VIEW
    //==========================================================================

    /**
     * KeyView associates a View with a key, which is meant to select values
     * from a properties object.
     */
    function KeyView(id, key) {
        this.view = new View(id);
        this.key = key;
    }

    extend(KeyView.prototype, viewDecoratorMixin);

    KeyView.prototype.showIff = function (properties) {
        var value = properties[this.key] ? 1 : 0;

        if (value > 0) {
            this.show();
        } else {
            this.hide();
        }
        return value;
    };

    //==========================================================================
    //                               GROUP VIEW
    //==========================================================================

    /**
     * A GroupView combines a View with a list of children which are also Views.
     * In the DOM, the GroupView's element should contain the elements of its
     * children. The idea is that the GroupView's element is going to want to be
     * hidden iff every element it contains is hidden. E.g., hide a ul iff every
     * li it contains is hidden.
     */
    function GroupView(id, children) {
        this.view = new View(id);
        this.children = children || [];
    }

    extend(GroupView.prototype, viewDecoratorMixin);

    GroupView.prototype.addChild = function (view) {
        this.children.push(view);
    };

    /**
     * Invokes showIff(properties) on all of the children, counting how many
     * are shown. If at least one of the children is shown, shows its element;
     * otherwise, hides its element. Returns the count of children shown.
     */
    GroupView.prototype.showIff = function (properties) {
        var value = sum(this.children, function (child) {
                return child.showIff(properties);
            });

        if (value > 0) {
            this.show();
        } else {
            this.hide();
        }
        return value;
    };


    //==========================================================================
    //                              COMPLEX VIEW
    //==========================================================================

    function ComplexView(id, key, group) {
        this.view = new KeyView(id, key);
        this.group = group;
    }

    extend(ComplexView.prototype, viewDecoratorMixin);

    ComplexView.prototype.showIff = function (properties) {
        return this.view.showIff(properties) + this.group.showIff(properties);
    };

    //==========================================================================
    //                                RESPONSE
    //==========================================================================

    function Response(xmlResponse) {
        var ELEMENT = 1;

        // Collect element nodes, ignoring useless nodes for blanks, etc.
        function elements(nodes) {
            return filter(nodes, function(node) {
                return node.nodeType === ELEMENT;
            });
        }

        // Go through the element children of node. These children will have an
        // XML form along the following lines:
        //
        // <key>value</key>          (The value is frequently empty: <key />)
        //
        // The string "key" is accessible via the nodeName attribute. The string
        // "value" can be accessed via the textContent attribute, or the
        // innerText attribute for older IE. For each such XML node, invoke the
        // callback on the strings "key" and "value".
        function keyValuePairs(node, callback, context) {
            each(elements(node.childNodes), function (child) {
                callback.call(this, child.nodeName,
                    child.textContent || child.innerText);
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

        // Fix some potential problems:
        // Some responses have a truthy value for an "...Other" key but lack a
        // corresponding "...OtherText" entry. This may be due to errors in
        // editing the data file, when an attempt was made to remove cases
        // where people selected "Other" and wrote in "None" as explanatory
        // text. Whatever the source of these cases, it is best to get rid of
        // them by deleting the "...Other" key.
        each(toOtherText, function (otherText, other) {
            if (this[other] && !this[otherText]) {
                delete this[other];
            }
        }, this);

        // Extend the set of key-value pairs:
        // The keys in the range of toKey fall into thematic groups, and these
        // groups form the range of toDependents. The domain of toDependents is
        // a set of "thematic" keys representing the overarching themes of those
        // thematic groups. For each thematic key in toDependents, add that key
        // with a value of 1, if there is a key from the corresponding thematic
        // group--the "dependents"--that wound up with a truthy value as a
        // result of the loop above. Thus, logically, each thematic key
        // represents the disjunction of its dependents. If any thematic key
        // turns out to get the value 1, add the the key expertise with value 1.
        // Logically, the expertise key represents the disjunction of the
        // thematic keys.
        each(toDependents, function(dependents, key) {
            if (some(dependents, function (dependent) {
                    return this[dependent];
                }, this)) {
                this[key] = 1;
                this.expertise = 1;
            }
        }, this);
    }

    Response.prototype.getName = function () {
        var value = this.name;

        if (!value) {
            value = this.nameText;
            if (typeof value !== "string") {
                throw new TypeError("Not a string: " + value);
            }
            value = trim(this.nameText);
            this.name = value;
        }
        return value;
    };

    Response.prototype.getEmail = function () {
        var value = this.email;

        if (!value) {
            value = this.emailText;
            if (typeof value !== "string") {
                throw new TypeError("Not a string: " + value);
            }
            value = trim(value).toLowerCase();
            if (!/^[\w\-\.]+@[\w\-\.]+\.[a-z]{2,5}$/.test(value)) {
                throw new Error("Not an email address: " + value);
            }
            this.email = value;
        }
        return value;
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

    Response.prototype.getAlphabetizer = function () {
        var value = this.alphabetizer;

        if (!value) {
            value = alphabetizer(this.getName());
            this.alphabetizer = value;
        }
        return value;
    };

    Response.prototype.compare = function (other) {
        return alphabetizerCompare(
            this.getAlphabetizer(), other.getAlphabetizer());
    };

    Response.prototype.contains = function(properties) {
        return contains(this, properties);
    };

    Response.prototype.html = function () {
        function nameEmailBlock(response) {
            var name = response.getName(),
                email = response.getEmail();

            return '<div class="nowrap wd-250 float-left">' +
                '<p><span class="highlight">' + name + "</span><br />" +
                '<a href="mailto:' + email + '">' + email + "</a></p>" +
                "</div>";
        }

        function rankDepartmentBlock(response, id) {
            var rank = response.getRank(),
                dept = response.getDepartment();

            return '<div class="nowrap wd-390 float-right">' +
                moreLessBlock(response, id) +
                "<p>" + rank + "<br />" + dept + "</p>" +
                "</div>";
        }

        function moreLessBlock(response, id) {
            return !response.expertise ? "" :
                '<div class="float-right">' +
                '<button id="more' + id + '">SHOW MORE</button>' +
                '<button id="less' + id + '" class="hide">SHOW LESS</button>' +
                "</div>";
        }

        function expertiseBlock(response, id) {
            return !response.expertise ? "" :
                '<div id="expertise' + id +
                '" class="expertiseResponseExpertise clear nowrap hide">' +
                reduce(toDependents, function (html, dependents, key) {
                    return html + complex(this, key, dependents);
                }, "", response) +
                "</div>";
        }

        function complex(response, key, dependents) {
            return !response[key] ? "" :
                "<p>" + toDescription[key] + "</p>" +
                "<ul>" +
                reduce(dependents, function (html, dependent) {
                    return html + simple(this, dependent);
                }, "", response) +
                "</ul>";
        }

        function simple(response, key) {
            return !response[key] ? "" :
                "<li>" +
                (toDescription[key] ||
                    capitalize(trim(response[key + "Text"]))) +
                "</li>";
        }

        var id = this.id;

        return '<div id="' + id + '" class="expertiseResponse nowrap">' +
            nameEmailBlock(this) +
            rankDepartmentBlock(this, id) +
            expertiseBlock(this, id) +
            "</div>";

    };

    //==========================================================================
    //                             RESPONSE VIEW
    //==========================================================================

    function ResponseView(response) {
        var id = response.id;

        this.view = new View(id);
        this.response = response;
        if (response.expertise) {
            this.more = new View("more" + id);
            this.less = new View("less" + id);
            this.extra = new View("expertise" + id);
            this.more.on("click", bind(function () {
                this.showMore();
            }, this));
            this.less.on("click", bind(function () {
                this.showLess();
            }, this));
        }
    }

    extend(ResponseView.prototype, viewDecoratorMixin);

    ResponseView.prototype.show = function () {
        if (this.response.expertise) {
            this.showLess();
        }
        return this.view.show();
    };

    ResponseView.prototype.showIff = function (properties) {
        var value = this.response.contains(properties) ? 1 : 0;

        if (value > 0) {
            this.show();
        } else {
            this.hide();
        }
        return value;
    };

    ResponseView.prototype.showMore = function () {
        this.more.hide();
        this.less.show();
        this.extra.show();
    };

    ResponseView.prototype.showLess = function () {
        this.less.hide();
        this.extra.hide();
        this.more.show();
    };

    //==========================================================================
    //                               RESPONSES
    //==========================================================================

    function Responses(xmlDocument, id) {
        // Returns a list of responses based on xmlDocument.
        function make(xmlDocument) {
            return map(xmlDocument.getElementsByTagName("Response"),
                function (xmlResponse) {
                    return new Response(xmlResponse);
                });
        }

        // Cuts down responses by removing those for which alwaysTrue fails.
        function cut(responses) {
            return filter(responses, function (response) {
                return response.contains(alwaysTrue);
            });
        }

        // Puts responses into alphabetical order by name.
        function order(responses) {
            return responses.sort(function (response1, response2) {
                return response1.compare(response2);
            });
        }

        // Returns an HTML expression corresponding to responses.
        function html(responses) {
            return reduce(responses, function (html, response) {
                return html + response.html();
            }, "");
        }

        function complex(key, dependents) {
            return new ComplexView(key + "Item", key, group(key, dependents));
        }

        function group(key, dependents) {
            return new GroupView(key + "Sublist",
                map(dependents, function (dependent) {
                    return simple(dependent);
                }));
        }

        function simple(key) {
            return new KeyView(key + "Item", key);
        }

        var responses = order(cut(make(xmlDocument))),
            helpListener = bind(function () {
                this.help.toggle();
            }, this);

        this.view = new View(id);
        this.searchNumber = new View("expertiseSearchNumber");
        this.matches = new View("expertiseResponsesMatches");
        this.help = new View("expertiseResponsesHelp");
        this.summary = new GroupView("expertiseResponsesSummary");
        each(toDependents, function (dependents, key) {
            this.summary.addChild(complex(key, dependents));
        }, this);
        this.container = new GroupView("expertiseResponsesContainer");
        this.container.fill(html(responses));
        each(responses, function (response) {
            this.container.addChild(new ResponseView(response));
        }, this);

        each(toButtons.expertiseResponsesHelp, function (button) {
            listener(button, "click", helpListener);
        });
    }

    extend(Responses.prototype, viewDecoratorMixin);

    Responses.prototype.hide = function () {
        this.help.hide();
        return this.view.hide();
    };

    Responses.prototype.populate = function (properties, priorSearches) {
        var matches = this.container.showIff(properties);

        this.summary.showIff(properties);
        this.searchNumber.fill((priorSearches + 1).toString());
        this.matches.fill(matches.toString() +
            " match" + (matches === 1 ? "" : "es"));
        return this;
    };

    //==========================================================================
    //                               CONTROLLER
    //==========================================================================

    function Controller(xmlDocument) {
        var applyListener = bind(function() {
                this.back.concat(this.forward);
                this.forward.clear();
                this.current = this.menu.hide().properties();
                this.cancels.show();      // First search must be over, so show.
                this.explanation.hide();  // Hide after first search.
                this.responses.populate(this.current, this.back.size()).show();
            }, this),
            cancelListener = bind(function() {
                this.menu.hide();
                this.current = this.back.pop();
                this.responses.show();
            }, this),
            newSearchListener = bind(function () {
                this.back.push(this.current);
                this.responses.hide();
                this.menu.clear().show();
            }, this),
            editSearchListener = bind(function () {
                this.back.push(this.current);
                this.responses.hide();
                this.menu.populate(this.current).show();
            }, this),
            backListener = bind(function () {
                this.forward.push(this.current);
                this.current = this.back.pop();
                this.responses.populate(this.current, this.back.size());
            }, this),
            forwardListener = bind(function () {
                this.back.push(this.current);
                this.current = this.forward.pop();
                this.responses.populate(this.current, this.back.size());
            }, this);

        this.cancels = new Multiview("expertiseCancel");
        this.back = new NavigatorButton("expertiseBack");
        this.forward = new NavigatorButton("expertiseForward");
        this.explanation = new View("expertiseExplanation");
        this.menu = new Menu("expertiseMenu");
        this.responses = new Responses(xmlDocument, "expertiseResponses");

        each(toButtons.expertiseApply, function (button) {
            listener(button, "click", applyListener);
        });
        each(toButtons.expertiseCancel, function (button) {
            listener(button, "click", cancelListener);
        });
        each(toButtons.expertiseNewSearch, function (button) {
            listener(button, "click", newSearchListener);
        });
        each(toButtons.expertiseEditSearch, function (button) {
            listener(button, "click", editSearchListener);
        });
        each(toButtons.expertiseBack, function (button) {
            listener(button, "click", backListener);
        });
        each(toButtons.expertiseForward, function (button) {
            listener(button, "click", forwardListener);
        });
    }

    Controller.prototype.initialize = function () {
        this.back.clear();
        this.forward.clear();
        this.cancels.hide();      // Hide for first search.
        this.responses.hide();
        this.explanation.show();  // Show for first search.
        this.menu.clear().show();
    };

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
