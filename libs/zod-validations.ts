import z from 'zod'

export type DataPemberitahuanSchemaProp = {
    nomor_pengajuan: string,
    tanggal_pengajuan: string,
    nomor_pendaftaran: string,
    tanggal_pendaftaran: string,
    ur_pabean_asal: string,
    kd_skep_fasilitas: string,
    jenis_pib: string,
    ur_jenis_impor: string,
    ur_cara_bayar: string,
    ur_transaksi_impor: string
}

export type ErrorDataPemberitahuanSchema = {
    nomor_pendaftaran: string[],
    tanggal_pendaftaran: string[]
}

const zodValidation = () => {

    const DataPemberitahuanSchema = z.object({
        nomor_pengajuan: z.string(),
        tanggal_pengajuan: z.string(),
        nomor_pendaftaran: z.string().min(1, 'Nomor Pendaftaran is required'),
        tanggal_pendaftaran: z.string().min(1, 'Tanggal Pendaftaran is required'),
        ur_pabean_asal: z.string(),
        kd_skep_fasilitas: z.string(),
        jenis_pib: z.string(),
        ur_jenis_impor: z.string(),
        ur_cara_bayar: z.string(),
        ur_transaksi_impor: z.string()
    });

    const parseDataPemberitahuan = (data: DataPemberitahuanSchemaProp) => {
        return DataPemberitahuanSchema.safeParse(data);
    };

    return {parseDataPemberitahuan};
};

export default zodValidation;