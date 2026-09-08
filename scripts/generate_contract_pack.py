from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.section import WD_SECTION
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[1]
GREEN = "154734"
GOLD = "B68B2E"
LIGHT = "EEF3F0"
INK = "202722"
MUTED = "66706A"

IDENTITES = (
    "ENTRE LES SOUSSIGNÉS :\n\n"
    "1. CABINET KOMIENA, [forme juridique], au capital de [●] FCFA, siège à [●], "
    "immatriculé au RCCM sous le n° [●], NIU [●], représenté par [nom, qualité], dûment habilité, "
    "ci-après « KOMIENA » ;\n\n"
    "ET\n\n"
    "2. SOCIÉTÉ UBUNTU, [forme juridique], au capital de [●] FCFA, siège à [●], "
    "immatriculée au RCCM sous le n° [●], NIU [●], représentée par [nom, qualité], dûment habilitée, "
    "ci-après « UBUNTU » ;\n\n"
    "KOMIENA et UBUNTU étant individuellement une « Partie » et ensemble les « Parties »."
)

COMMON = [
    ("Confidentialité et données", "Sont confidentiels les prospects, décideurs, coordonnées, prix, marges, offres, documents techniques, méthodes, échanges et conditions commerciales, quel qu’en soit le support. Chaque Partie limite l’accès aux seules personnes ayant besoin d’en connaître, impose une obligation équivalente à ses collaborateurs et protège les données conformément à la loi congolaise n° 29-2019 du 10 octobre 2019. L’obligation dure cinq (5) ans après la fin du contrat ; les secrets d’affaires restent protégés tant qu’ils ne sont pas publics. Toute violation doit être notifiée sans délai et les données restituées ou supprimées sur demande, sous réserve des obligations légales de conservation."),
    ("Non-concurrence ciblée et non-circonvention", "Pendant le contrat et vingt-quatre (24) mois après sa fin, UBUNTU s’interdit, directement ou par personne interposée, de traiter hors KOMIENA avec un Prospect Protégé pour les besoins présentés par KOMIENA, afin d’éluder la rémunération convenue. Cette restriction est limitée aux prospects enregistrés, aux opérations concernées et au territoire de la République du Congo ; elle n’interdit pas l’activité générale d’UBUNTU. KOMIENA s’interdit de détourner les moyens, salariés ou fournisseurs confidentiels d’UBUNTU hors des opérations convenues. Toute relation antérieure doit être prouvée par un écrit daté dans les cinq (5) jours ouvrés suivant l’enregistrement du prospect."),
    ("Propriété intellectuelle", "Chaque Partie conserve ses marques, méthodes, fichiers, modèles et contenus antérieurs. Les offres, présentations ou supports créés conjointement ne peuvent être réutilisés hors du partenariat sans accord écrit. Aucune cession de marque, licence générale ou propriété de base de données n’est présumée. Les données de prospection constituées par KOMIENA restent sa propriété, sous réserve des données personnelles et des droits du client. Toute publication de nom, logo, photographie ou référence commerciale exige une autorisation écrite préalable."),
    ("Résiliation et survie des droits", "Chaque Partie peut résilier en cas de manquement non réparé dans les quinze (15) jours calendaires après mise en demeure écrite. La résiliation immédiate est admise en cas de fraude, corruption, violation grave de confidentialité, contournement, insolvabilité ou atteinte à la réputation. La fin du contrat ne prive pas KOMIENA des commissions nées, en cours de maturation ou rattachées à un Prospect Protégé pendant la période de protection. Les clauses de paiement, audit, confidentialité, non-circonvention, propriété intellectuelle, responsabilité et litiges survivent à la résiliation."),
    ("Droit applicable et règlement des litiges", "Le contrat est régi par le droit de la République du Congo et les Actes uniformes OHADA applicables. Tout différend fait d’abord l’objet d’une notification motivée puis d’une négociation entre dirigeants pendant quinze (15) jours. À défaut, les Parties tentent une médiation pendant trente (30) jours. En cas d’échec, compétence expresse est attribuée au Tribunal de commerce de Brazzaville, y compris en référé, sauf accord écrit ultérieur pour un arbitrage CCJA. Les mesures conservatoires restent possibles à tout moment."),
]

def shade(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    tc_pr.append(shd)

def set_cell_margins(cell, top=100, start=120, bottom=100, end=120):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = tcPr.first_child_found_in("w:tcMar")
    if tcMar is None:
        tcMar = OxmlElement("w:tcMar")
        tcPr.append(tcMar)
    for m, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tcMar.find(qn(f"w:{m}"))
        if node is None:
            node = OxmlElement(f"w:{m}")
            tcMar.append(node)
        node.set(qn("w:w"), str(value)); node.set(qn("w:type"), "dxa")

def set_repeat_table_header(row):
    trPr = row._tr.get_or_add_trPr()
    tblHeader = OxmlElement("w:tblHeader")
    tblHeader.set(qn("w:val"), "true")
    trPr.append(tblHeader)

def configure(doc, short_title):
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(8.5), Inches(11)
    sec.top_margin = sec.bottom_margin = sec.left_margin = sec.right_margin = Inches(1)
    sec.header_distance = sec.footer_distance = Inches(.492)
    styles = doc.styles
    normal = styles["Normal"]
    normal.font.name = "Cambria"; normal.font.size = Pt(10.5); normal.font.color.rgb = RGBColor.from_string(INK)
    normal.paragraph_format.space_after = Pt(6); normal.paragraph_format.line_spacing = 1.12
    for name, size, before, after in (("Heading 1", 16, 16, 8), ("Heading 2", 13, 12, 6), ("Heading 3", 11.5, 8, 4)):
        s = styles[name]; s.font.name = "Cambria"; s.font.size = Pt(size); s.font.bold = True
        s.font.color.rgb = RGBColor.from_string(GREEN); s.paragraph_format.space_before = Pt(before); s.paragraph_format.space_after = Pt(after)
        s.paragraph_format.keep_with_next = True
    header = sec.header.paragraphs[0]
    header.text = f"CABINET KOMIENA × SOCIÉTÉ UBUNTU  |  {short_title.upper()}  |  CONFIDENTIEL"
    header.style = normal; header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for r in header.runs: r.font.size = Pt(8); r.font.color.rgb = RGBColor.from_string(MUTED); r.bold = True
    footer = sec.footer.paragraphs[0]; footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = footer.add_run("Modèle à compléter et à faire valider par un conseil juridique congolais avant signature")
    r.font.name = "Cambria"; r.font.size = Pt(8); r.font.color.rgb = RGBColor.from_string(MUTED)

def add_cover(doc, title, subtitle):
    p = doc.add_paragraph(); p.paragraph_format.space_before = Pt(50); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("CABINET KOMIENA  ×  SOCIÉTÉ UBUNTU"); r.bold = True; r.font.size = Pt(11); r.font.color.rgb = RGBColor.from_string(GOLD)
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before = Pt(20); p.paragraph_format.space_after = Pt(8)
    r = p.add_run(title.upper()); r.bold = True; r.font.name = "Cambria"; r.font.size = Pt(24); r.font.color.rgb = RGBColor.from_string(GREEN)
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after = Pt(28)
    r = p.add_run(subtitle); r.italic = True; r.font.size = Pt(12); r.font.color.rgb = RGBColor.from_string(MUTED)
    table = doc.add_table(rows=1, cols=1); table.alignment = WD_TABLE_ALIGNMENT.CENTER; table.autofit = False
    cell = table.cell(0, 0); cell.width = Inches(5.7); shade(cell, LIGHT); set_cell_margins(cell, 450, 200, 450, 200)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    p = cell.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("EMPLACEMENT RÉSERVÉ\nLogo ou image illustrative du partenariat"); r.bold = True; r.font.size = Pt(10); r.font.color.rgb = RGBColor.from_string(MUTED)
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before = Pt(28)
    p.add_run("République du Congo  •  Version [●]  •  Date [●]").font.size = Pt(10)
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before = Pt(10)
    r = p.add_run("DOCUMENT CONFIDENTIEL — MODÈLE MODIFIABLE"); r.bold = True; r.font.color.rgb = RGBColor.from_string(GREEN)
    doc.add_page_break()

def add_notice(doc):
    t = doc.add_table(rows=1, cols=1); t.alignment = WD_TABLE_ALIGNMENT.CENTER; t.autofit = False
    c = t.cell(0,0); c.width = Inches(6.5); shade(c, "FFF7E5"); set_cell_margins(c, 140, 160, 140, 160)
    p = c.paragraphs[0]
    r = p.add_run("À vérifier avant signature. "); r.bold = True; r.font.color.rgb = RGBColor.from_string(GOLD)
    p.add_run("Compléter tous les champs [●], annexer RCCM/NIU, statuts, pouvoirs des signataires, barème financier et liste des prospects. Une validation par un avocat ou conseil juridique habilité au Congo demeure indispensable.")

def add_article(doc, index, title, text):
    doc.add_heading(f"Article {index} — {title}", level=1)
    for para in text.split("\n"):
        p = doc.add_paragraph(para)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.widow_control = True

def add_common(doc, start):
    i = start
    for title, text in COMMON:
        add_article(doc, i, title, text); i += 1
    return i

def add_signatures(doc, parties=("Pour le Cabinet KOMIENA", "Pour la Société UBUNTU")):
    doc.add_heading("Signatures", level=1)
    p = doc.add_paragraph("Fait à [ville], le [date], en [deux/trois] originaux. Chaque signataire paraphe chaque page et reconnaît avoir reçu son original.")
    table = doc.add_table(rows=2, cols=len(parties)); table.alignment = WD_TABLE_ALIGNMENT.CENTER; table.autofit = False
    widths = [6.5 / len(parties)] * len(parties)
    for j, label in enumerate(parties):
        c = table.cell(0,j); c.width = Inches(widths[j]); shade(c, LIGHT); set_cell_margins(c)
        p = c.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.CENTER; r = p.add_run(label); r.bold = True; r.font.color.rgb = RGBColor.from_string(GREEN)
        c = table.cell(1,j); c.width = Inches(widths[j]); set_cell_margins(c, 100, 120, 650, 120)
        c.paragraphs[0].add_run("Nom : [●]\nQualité : [●]\nSignature précédée de « Lu et approuvé » :")

def save_contract(filename, title, subtitle, specific, common_start, annexes=None, parties=None):
    doc = Document(); configure(doc, title); add_cover(doc, title, subtitle); add_notice(doc)
    doc.add_heading("Identification des Parties", level=1); doc.add_paragraph(IDENTITES)
    for i, (heading, text) in enumerate(specific, 1): add_article(doc, i, heading, text)
    next_i = add_common(doc, common_start)
    if annexes:
        doc.add_heading("Annexes contractuelles", level=1)
        for item in annexes: doc.add_paragraph(item, style="List Bullet")
    add_signatures(doc, parties or ("Pour le Cabinet KOMIENA", "Pour la Société UBUNTU"))
    doc.core_properties.title = title; doc.core_properties.subject = subtitle
    doc.core_properties.author = "Cabinet KOMIENA"
    doc.save(ROOT / filename)

accord = [
    ("Objet et principes du partenariat", "Les Parties organisent une coopération commerciale gagnant-gagnant pour identifier, qualifier, négocier et exécuter des opportunités de location, vente, transport, maintenance ou fourniture d’équipements et services connexes. KOMIENA apporte les opportunités et facilite la relation ; UBUNTU établit les offres, contracte et exécute les prestations, sauf mandat spécial écrit. Le présent accord ne crée ni société commune, ni lien de subordination, ni solidarité à l’égard des tiers."),
    ("Enregistrement et protection des opportunités", "KOMIENA enregistre chaque prospect par la Fiche d’enregistrement annexée, adressée aux contacts désignés par courriel avec accusé de réception. Sans contestation documentée d’UBUNTU sous cinq (5) jours ouvrés, le prospect est réputé accepté et protégé. La protection couvre le prospect, ses filiales, sociétés sœurs, mandataires, bénéficiaires effectifs, groupements et toute entité qui contracte pour le même projet. Elle s’étend aux contrats initiaux, lots, avenants, extensions, renouvellements, reconductions, remplacements et opérations économiquement liées conclus pendant le contrat ou dans les vingt-quatre (24) mois suivant sa fin."),
    ("Rôle et obligations de KOMIENA", "KOMIENA identifie loyalement les besoins, transmet des informations exactes à sa connaissance, respecte les règles anticorruption, évite toute promesse engageant UBUNTU sans mandat et rend compte de ses démarches. KOMIENA ne garantit ni la solvabilité du prospect ni la conclusion de l’affaire, sauf faute prouvée."),
    ("Rôle et obligations d’UBUNTU", "UBUNTU répond aux demandes dans les [48] heures ouvrées, remet des offres sincères, informe KOMIENA de chaque réunion, offre, commande, facture, encaissement, avenant et renouvellement concernant un Prospect Protégé. Elle exécute les prestations sous sa responsabilité, maintient assurances et autorisations, et ne modifie pas artificiellement prix, périmètre, entité contractante ou mode de facturation pour réduire la commission."),
    ("Rémunération, fait générateur et paiement", "La commission est fixée par l’Annexe de commissions. Sauf choix différent en annexe, elle est calculée sur le chiffre d’affaires hors taxes effectivement encaissé par UBUNTU au titre de toute Opération Protégée, sans déduction de marge, frais internes ou remise non approuvée. Le droit naît à la signature du contrat client et devient exigible au prorata de chaque encaissement. UBUNTU transmet le relevé et paie dans les cinq (5) jours ouvrés suivant l’encaissement. Tout retard porte intérêt au taux légal majoré de cinq points, sans préjudice des frais de recouvrement et dommages justifiés."),
    ("Transparence, preuve et audit", "UBUNTU tient un état mensuel des Prospects Protégés, offres, commandes, contrats, factures, avoirs et paiements. KOMIENA peut, une fois par trimestre et sur préavis de cinq jours, faire vérifier par un professionnel tenu au secret les seuls documents utiles au calcul des commissions. Un écart supérieur à cinq pour cent est corrigé immédiatement et les frais raisonnables de contrôle sont supportés par UBUNTU. Les courriels, messages professionnels, procès-verbaux, fiches signées et documents électroniques constituent des modes de preuve admis entre les Parties, sous réserve de la loi."),
    ("Garanties, conformité et responsabilité", "Chaque Partie garantit son existence, ses pouvoirs, ses autorisations et le respect des lois fiscales, sociales, anticorruption, anti-blanchiment, sécurité et protection des données. UBUNTU assume seule la conformité, la garde, l’assurance, la maintenance et l’exécution des équipements et services fournis au client. Aucune Partie ne répond des fautes de l’autre. Les limitations de responsabilité ne s’appliquent pas à la fraude, au dol, au contournement, à la confidentialité, aux données, à la propriété intellectuelle ou aux commissions impayées."),
    ("Durée et pilotage", "Le contrat prend effet à sa signature pour vingt-quatre (24) mois, renouvelable par accord écrit. Un comité composé d’un représentant de chaque Partie se réunit au moins mensuellement. Toute exclusivité doit être décrite par secteur, territoire, durée et objectifs dans un avenant ; à défaut, le partenariat est non exclusif."),
]

ncn = [
    ("Objet", "La présente convention encadre tout échange d’informations et toute mise en relation relative aux clients, prospects, partenaires, fournisseurs, financeurs et projets présentés par l’une des Parties à l’autre."),
    ("Identification d’une introduction protégée", "Une introduction est protégée dès qu’elle est communiquée par écrit avec l’identité du contact ou une description suffisante du projet. Le destinataire dispose de cinq (5) jours ouvrés pour produire la preuve d’une relation active, directe et antérieure sur le même besoin ; le simple fait de connaître le nom du prospect ne suffit pas."),
    ("Interdiction de contournement", "Aucune Partie ne peut contacter, négocier, contracter, facturer ou faire contracter un tiers avec une Introduction Protégée en excluant l’introducteur ou en évitant la rémunération convenue. L’interdiction couvre prête-noms, affiliés, sous-traitants, salariés, actionnaires, dirigeants et toute modification artificielle du montage."),
    ("Réparation", "La Partie contournée conserve la totalité de la rémunération qu’elle aurait perçue sur l’opération directe ou indirecte, augmentée des intérêts, frais de contrôle et préjudice supplémentaire prouvé. À titre de clause pénale révisable par le juge, la Partie fautive verse en outre [20] % du montant hors taxes de l’opération contournée, avec un minimum de [●] FCFA. Cette clause n’empêche ni l’exécution forcée ni une mesure conservatoire."),
    ("Durée", "La convention prend effet à la date de signature. Chaque introduction reste protégée trente-six (36) mois à compter de son enregistrement, même si les discussions sont interrompues puis reprises."),
]

mandat = [
    ("Mission confiée", "UBUNTU confie à KOMIENA une mission indépendante de prospection, qualification, présentation et accompagnement commercial concernant [territoire/secteur]. KOMIENA agit comme apporteur d’affaires et ne peut signer, encaisser, accorder de remise, garantir un résultat ou engager UBUNTU sans procuration spéciale écrite."),
    ("Prospects et attribution", "Tout prospect communiqué dans le registre annexé est attribué à KOMIENA sauf objection documentée dans les cinq (5) jours ouvrés. L’attribution couvre les entités liées et opérations connexes. UBUNTU informe KOMIENA de la suite donnée et lui permet de participer aux échanges commerciaux, sauf demande contraire écrite du client."),
    ("Commission et continuité", "KOMIENA perçoit [●] % du chiffre d’affaires hors taxes encaissé ou [●] FCFA par opération. La commission s’applique aux commandes initiales, complémentaires, renouvelées ou remplacées et aux contrats conclus avec une entité liée au prospect pendant la période de protection de vingt-quatre (24) mois. Elle reste due si le mandat cesse avant la signature dès lors que l’apport de KOMIENA a contribué à l’opération."),
    ("Indépendance", "KOMIENA organise librement son activité, supporte ses charges et obligations fiscales et ne reçoit aucun ordre caractérisant un lien de subordination. Le mandat n’est exclusif que si l’Annexe le prévoit avec objectifs mesurables. Aucune dépense n’est remboursable sans accord écrit préalable."),
    ("Information et reddition", "UBUNTU communique sans délai les offres, contrats, factures et encaissements relatifs aux prospects attribués. Un relevé contradictoire est établi au plus tard le cinquième jour de chaque mois. Le silence sur un relevé pendant dix jours vaut acceptation, sous réserve de fraude ou erreur manifeste."),
]

commission = [
    ("Objet de l’annexe", "La présente annexe complète l’accord-cadre ou le mandat signé le [●]. En cas de contradiction, les dispositions les plus protectrices du droit à commission s’appliquent, sauf mention expresse et paraphée des Parties."),
    ("Barème", "Location d’équipements : [●] % du chiffre d’affaires HT encaissé.\nVente d’équipements ou pièces : [●] % du chiffre d’affaires HT encaissé.\nTransport, maintenance et services : [●] % du chiffre d’affaires HT encaissé.\nPrime de succès additionnelle : [●] FCFA lorsque [objectif mesurable].\nMinimum garanti par opération conclue : [●] FCFA."),
    ("Assiette protégée", "L’assiette comprend prix principal, options, prolongations, pénalités contractuelles encaissées, avenants, renouvellements et commandes des entités liées. Sont exclus uniquement la TVA, les remboursements de débours réels justifiés et les avoirs effectivement consentis au client pour inexécution. Toute compensation, paiement à un affilié ou paiement en nature est valorisé à sa valeur normale."),
    ("Décompte et facture", "UBUNTU adresse un décompte dans les deux (2) jours ouvrés suivant chaque encaissement avec copie de la preuve bancaire et de la facture client. KOMIENA émet sa facture conforme. Le règlement intervient dans les cinq (5) jours ouvrés, par virement sur le compte [●]. Les retenues fiscales légalement obligatoires sont justifiées par une attestation remise dans le délai légal ; aucune autre déduction unilatérale n’est admise."),
    ("Registre des prospects", "Le tableau annexé vaut preuve de l’attribution. Colonnes obligatoires : numéro, date/heure, prospect et entités liées, contact, besoin/projet, source, preuve jointe, date d’acceptation, objection motivée, statut, offres, contrat, factures, encaissements, commission due, commission payée."),
]

tripartite = [
    ("Intervention et identification du Client", "Intervient également au présent acte le CLIENT : [raison sociale / nom], [forme juridique], siège ou domicile à [●], RCCM [●], NIU [●], représenté par [nom et qualité], dûment habilité, ci-après le « CLIENT ». Le CLIENT déclare disposer du pouvoir de reconnaître l’origine de la mise en relation sans engager son entreprise au-delà du présent acte."),
    ("Objet et reconnaissance de l’apport", "Le CLIENT reconnaît avoir été présenté à UBUNTU par le Cabinet KOMIENA le [date] pour le projet [●]. UBUNTU reconnaît que cette présentation est la cause commerciale protégée de toute opération relative à ce besoin et à ses extensions. Cette reconnaissance ne crée aucune obligation de paiement du CLIENT envers KOMIENA, sauf stipulation expresse ci-dessous."),
    ("Rôles", "UBUNTU demeure seul fournisseur et responsable de l’offre, du contrat client, de la facturation, de l’exécution, de la sécurité et des garanties. KOMIENA facilite les échanges sans se substituer à UBUNTU. Le CLIENT transmet des informations sincères sur le besoin, les habilitations et le calendrier et désigne un interlocuteur autorisé."),
    ("Transparence de l’opération", "Le CLIENT autorise UBUNTU à informer KOMIENA, dans la stricte mesure nécessaire, de la signature, du montant, des avenants et du paiement de l’opération afin de liquider la commission. Aucune donnée non nécessaire ou sensible n’est transmise. UBUNTU et le CLIENT s’interdisent tout montage visant à dissimuler l’opération ou à évincer KOMIENA."),
    ("Protection des suites", "La reconnaissance couvre pendant vingt-quatre (24) mois les lots, commandes, renouvellements, prolongations, avenants et contrats conclus par une entité affiliée du CLIENT pour le même projet ou un besoin directement dérivé."),
    ("Absence de garantie par KOMIENA", "KOMIENA ne garantit ni la solvabilité du CLIENT, ni la performance d’UBUNTU, ni la conformité technique des équipements. Les réclamations d’exécution sont réglées entre UBUNTU et le CLIENT, sans préjudice du devoir de coopération de KOMIENA."),
]

reconnaissance = [
    ("Reconnaissance de dette", "UBUNTU reconnaît devoir au Cabinet KOMIENA la somme certaine, liquide et exigible de [montant en chiffres] FCFA ([montant en lettres]) au titre des commissions relatives à [prospect/contrat/factures]. Le détail figure en Annexe 1. Cette reconnaissance est faite sans réserve, sous réserve des seuls paiements effectivement reçus et justifiés après la date d’arrêté."),
    ("Échéancier", "Le paiement intervient comme suit : [●] FCFA le [date] ; [●] FCFA le [date] ; solde de [●] FCFA le [date]. Chaque paiement est effectué par virement sur le compte [●]. Une quittance partielle est délivrée après encaissement effectif."),
    ("Déchéance du terme", "Le défaut de paiement d’une échéance, non réparé dans les cinq (5) jours calendaires après notification, rend immédiatement exigible la totalité du solde, avec intérêts au taux légal majoré de cinq points. UBUNTU rembourse les frais raisonnables et justifiés de recouvrement."),
    ("Garantie optionnelle", "Pour garantir le paiement, les Parties conviennent de l’instrument suivant, à formaliser séparément selon les exigences légales : [caution solidaire du dirigeant / garantie bancaire / domiciliation irrévocable / sûreté mobilière publiée au RCCM / autre : ●]. Aucune sûreté n’est réputée constituée par la seule mention du présent article sans accomplissement des formalités requises."),
    ("Maintien des autres droits", "Le présent protocole règle uniquement la dette arrêtée. Il ne vaut ni renonciation aux commissions futures, ni novation, ni abandon des droits liés à d’autres prospects, avenants ou renouvellements, sauf mention expresse, détaillée et paraphée."),
]

fiche = [
    ("Objet et mode d’emploi", "Cette fiche doit être complétée pour chaque nouvelle opportunité, envoyée aux contacts contractuels d’UBUNTU et conservée avec la preuve d’envoi. UBUNTU dispose de cinq (5) jours ouvrés pour accepter ou contester avec des pièces datées."),
    ("Identification du prospect", "N° d’enregistrement : [●]\nDate et heure : [●]\nRaison sociale / nom : [●]\nRCCM/NIU si disponible : [●]\nAdresse : [●]\nContact et fonction : [●]\nTéléphone / e-mail : [●]\nSociétés affiliées connues : [●]"),
    ("Description de l’opportunité", "Projet / besoin : [●]\nÉquipements ou services : [●]\nLieu d’exécution : [●]\nBudget estimatif : [●] FCFA\nCalendrier : [●]\nDécideurs / prescripteurs : [●]\nDocuments ou preuves joints : [●]"),
    ("Décision d’UBUNTU", "☐ Acceptée sans réserve le [●]\n☐ Acceptée avec réserves suivantes : [●]\n☐ Contestée pour relation antérieure active, pièces obligatoires jointes : [●]\nResponsable UBUNTU : [●]\nSignature / cachet : [●]"),
    ("Suivi financier", "Offre n° / date / montant HT : [●]\nContrat ou commande : [●]\nFactures : [●]\nEncaissements : [●]\nTaux de commission : [●]\nCommission exigible / payée / solde : [●]"),
]

save_contract("01_Accord_cadre_partenariat_KOMIENA_UBUNTU.docx", "Accord-cadre de partenariat commercial", "Apport d’affaires, développement commercial et protection des opportunités", accord, 9, ["Annexe A — Barème de commissions", "Annexe B — Fiche et registre des prospects", "Annexe C — Contacts de notification", "Annexe D — Attestations RCCM, NIU, pouvoirs et coordonnées bancaires"])
save_contract("02_Convention_confidentialite_non_circonvention.docx", "Convention de confidentialité et de non-circonvention", "Protection autonome des introductions, informations et relations commerciales", ncn, 6)
save_contract("03_Mandat_apporteur_affaires_KOMIENA.docx", "Mandat d’apporteur d’affaires", "Mission indépendante de prospection et droit à commission", mandat, 6, ["Secteur et territoire", "Objectifs éventuels", "Barème de rémunération", "Registre initial des prospects"])
save_contract("04_Annexe_commissions_registre_prospects.docx", "Annexe financière et registre des prospects", "Barème, assiette, exigibilité, preuve et suivi des commissions", commission, 6)
save_contract("05_Acte_tripartite_reconnaissance_apport.docx", "Acte tripartite de reconnaissance d’apport", "Cabinet KOMIENA — Société UBUNTU — Client présenté", tripartite, 7, parties=("Pour KOMIENA", "Pour UBUNTU", "Pour le CLIENT [●]"))
save_contract("06_Protocole_reconnaissance_dette_commissions.docx", "Protocole de reconnaissance de dette", "Sécurisation des commissions échues et échéancier de paiement", reconnaissance, 6)
save_contract("07_Fiche_enregistrement_opportunite.docx", "Fiche d’enregistrement d’une opportunité", "Preuve d’apport, acceptation, suivi commercial et liquidation de commission", fiche, 6)

print("\n".join(str(p) for p in sorted(ROOT.glob("0*_*.docx"))))
