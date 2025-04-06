import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { admissionTypes, branches, classes } from "../../configs/constOptions";

Font.register({
  family: "Ador",
  src: "/fonts/sagarnormal.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    lineHeight: 1.2,
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    fontFamily: "Ador",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#b3e0dc",

    borderRadius: 5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  schoolInfo: {
    textAlign: "right",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  text: {
    marginBottom: 3,
    fontFamily: "Ador",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    flexGrow: 1,
  },
  label: {
    fontWeight: "bold",
    color: "#008080",
    fontFamily: "Ador",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 8,
  },
  badge: {
    textAlign: "center",
    marginVertical: 10,
    padding: 5,
    backgroundColor: "#008080",
    color: "#ffffff",
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});

const RenderApplicationFormPdf = ({ data }) => {
  if (!data) return null;

  let findBranch;
  let findAdmissionType;
  let findClass;
  let applicationDate;
  if (data) {
    findBranch = branches.find((c) => c.value === data.branch).label;

    findAdmissionType = admissionTypes.find(
      (c) => c.value === data.admissionType
    ).label;

    findClass = classes.find((c) => c.value === data.class).label;

    applicationDate = new Date(data.createdAt).toLocaleDateString("en-GB");
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/assets/school_logo.png" />
          <View style={styles.schoolInfo}>
            <Text style={styles.title}>H.A.K Academy</Text>
            <Text style={styles.subtitle}>
              Joyna Bazar(College Road), Sreepur, Gazipur
            </Text>
            <Text style={styles.subtitle}>EIIN Number: 136577</Text>
            <Text style={styles.subtitle}>Established: 2003</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text>Application ID: {data.applicationId}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>
            <Text style={styles.label}>Application Date:</Text>{" "}
            {applicationDate}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admission Type and Branch</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Admission Type:</Text>{" "}
                {findAdmissionType}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Branch:</Text> {findBranch}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student&apos;s Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Student Name:</Text>{" "}
                {data.studentName}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Student Name (Bangla):</Text>{" "}
                {data.studentNameBangla}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Class:</Text> {findClass}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Session:</Text> {data.session}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Father&apos;s Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Father&apos;s Name:</Text>{" "}
                {data.fatherName}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Father&apos;s Name (Bangla):</Text>{" "}
                {data.fatherNameBangla}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Father&apos;s Occupation:</Text>{" "}
                {data.fatherOccupation}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Father&apos;s Yearly Income:</Text>{" "}
                {data.fatherYearlyIncome}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Father&apos;s Contact No:</Text>{" "}
                {data.fatherContactNo}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mother&apos;s Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Mother&apos;s Name:</Text>{" "}
                {data.motherName}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Mother&apos;s Name (Bangla):</Text>{" "}
                {data.motherNameBangla}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Mother&apos;s Occupation:</Text>{" "}
                {data.motherOccupation}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Mother&apos;s Contact No:</Text>{" "}
                {data.motherContactNo}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Student&apos;s Personal Information
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Date of Birth:</Text>{" "}
                {new Date(data.dateOfBirth).toLocaleDateString("en-GB")}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Blood Group:</Text> {data.bloodGroup}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Height:</Text> {data.height}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Weight:</Text> {data.weight}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Identification Mark:</Text>{" "}
                {data.identificationMark}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student&apos;s Address</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Present Address:</Text>{" "}
                {data.presentAddress}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Permanent Address:</Text>{" "}
                {data.permanentAddress}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>Emergency Contact No:</Text>{" "}
                {data.emergencyContactNo}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>
                  Relation with Emergency Contact:
                </Text>{" "}
                {data.relationWithEmergencyContact}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Institution</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.label}>
                  Name of the previous institution:
                </Text>{" "}
                {data.previousInstitution}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RenderApplicationFormPdf;
