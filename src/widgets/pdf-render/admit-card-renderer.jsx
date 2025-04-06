import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Kalpurush",
  src: "/fonts/kalpurush.ttf",
});

// Register fonts if needed
Font.register({
  family: "Times-Roman",
  src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times-New-Roman-Regular.ttf",
});

Font.register({
  family: "Times-Bold",
  src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times-New-Roman-Bold.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Kalpurush",
  },
  container: {
    border: "1 solid #000000",
    padding: 10,
    position: "relative",
  },
  backgroundWatermark: {
    position: "absolute",
    top: "40%",
    left: "40%",
    width: 200,
    height: 200,
    opacity: 0.1,
    transform: "translate(-50%, -50%)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    width: 70,
    height: 70,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  schoolInfo: {
    flex: 1,
    textAlign: "center",
  },
  schoolName: {
    fontSize: 24,
    fontFamily: "Kalpurush",
    marginBottom: 5,
  },
  schoolAddress: {
    fontSize: 12,
    marginBottom: 3,
  },
  schoolWebsite: {
    fontSize: 10,
  },
  photoContainer: {
    width: 80,
    height: 100,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  qrCode: {
    width: 80,
    height: 80,
    marginTop: 5,
  },
  admitCardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Kalpurush",
    backgroundColor: "#333333",
    color: "#ffffff",
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
    width: "40%",
    alignSelf: "center",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: "Kalpurush",
    marginRight: 5,
  },
  infoValue: {
    fontSize: 12,
    textDecoration: "underline",
    flex: 1,
  },
  infoValueNoLine: {
    fontSize: 12,
    flex: 1,
  },
  instructionsSection: {
    marginTop: 10,
    borderLeft: "5 solid #000000",
    paddingLeft: 10,
    fontSize: 9,
  },
  instruction: {
    marginBottom: 3,
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  signature: {
    width: 80,
    height: 30,
  },
  principalText: {
    fontSize: 12,
    textAlign: "center",
  },
  dateText: {
    fontSize: 10,
    textAlign: "center",
  },
  dotPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
  },
});

// Sample data - in a real app, this would be passed as props
const admitCardData = {
  schoolName: "H. A. K. Academy",
  schoolAddress: "College Road, Joina Bazar, Sreepur, Gazipur.",
  examName: "Exam - 2025",
  section: "",
  date: "30/10/2024",
  // Instructions in Bengali - these would be actual instructions in a real app
  instructions: [
    "পরীক্ষা শুরু হওয়ার সময়ের ১৫ মিনিট পূর্বে পরীক্ষার হলে প্রবেশ করতে হবে।",
    "প্রবেশপত্র ছাড়া কোন কাগজপত্র পরীক্ষা কেন্দ্রে বহন করা যাবে না।",
    "প্রত্যেক পরীক্ষার্থীকে প্রয়োজনীয় কলম, পেন্সিল ও জ্যামিতি বক্স সঙ্গে আনতে হবে।",
    "পরীক্ষা শেষ হওয়ার পর পরিদর্শকের নির্দেশক্রমে পরীক্ষার্থী পরীক্ষা কেন্দ্র ত্যাগ করবে।",
    "কোন পরীক্ষার্থী অসৎ উপায় অবলম্বন করলে তার পরীক্ষা বাতিল বলে গণ্য হবে।",
  ],
};

// Create Document Component
const AdmitCard = ({ student, examName, className }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Background dot pattern */}
        <View style={styles.dotPattern} />

        {/* Watermark logo in background */}
        <Image
          src="/assets/school_logo.png?height=200&width=200"
          style={styles.backgroundWatermark}
        />

        {/* Header section */}
        <View style={styles.header}>
          {/* School logo */}
          <View style={styles.logoContainer}>
            <Image
              src="/assets/school_logo.png?height=70&width=70"
              style={styles.logo}
            />
          </View>

          {/* School information */}
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{admitCardData.schoolName}</Text>
            <Text style={styles.schoolAddress}>
              {admitCardData.schoolAddress}
            </Text>
          </View>

          {/* Student photo and QR code */}
          <View>
            <View style={styles.photoContainer}>
              <Image
                src="/placeholder.svg?height=100&width=80"
                style={styles.photo}
              />
            </View>
            <Image
              src="/placeholder.svg?height=80&width=80"
              style={styles.qrCode}
            />
          </View>
        </View>

        {/* Admit Card title */}
        <Text style={styles.admitCardTitle}>ADMIT CARD</Text>

        {/* Student information */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Exam Name :</Text>
            <Text style={styles.infoValueNoLine}>
              {examName ? examName : admitCardData.examName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Student Name :</Text>
            <Text style={styles.infoValue}>{student.name}</Text>
            <Text style={styles.infoLabel}>Student ID :</Text>
            <Text style={styles.infoValue}>{student.studentId}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class :</Text>
            <Text style={styles.infoValue}>{className?.split(" ")[1]}</Text>
            <Text style={styles.infoLabel}>Roll :</Text>
            <Text style={styles.infoValue}></Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          {admitCardData.instructions.map((instruction, index) => (
            <Text key={index} style={styles.instruction}>
              {instruction}
            </Text>
          ))}
        </View>

        {/* Signature section */}
        <View style={styles.signatureSection}>
          <View>
            <Image
              src="/placeholder.svg?height=30&width=80"
              style={styles.signature}
            />
            <Text style={styles.principalText}>Principal</Text>
            <Text style={styles.dateText}>
              Date: {new Date().toLocaleDateString("en-GB")}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default AdmitCard;
