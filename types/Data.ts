export type DataUtamaProp = {
    id_aju: string;
    nomor_pengajuan: string;
    kegiatan_ke: number;
    kd_pabean_asal: string;
    kd_pabean_pengawas: string | null;
    kd_jenis_ekspor: string | null;
    kd_kategori_ekspor: string | null;
    jenis_ppkek: string;
    jenis_kegiatan: string;
    kd_kegiatan: string;
    kd_transaksi: string;
    kd_cara_bayar: number;
    kd_cara_dagang: string | null;
    tanggal_pengajuan: string;
    nomor_pendaftaran: string | null;
    tanggal_pendaftaran: string | null;
    berat_kotor: string;
    berat_bersih: string;
    kd_skep_fasilitas: string;
    jenis_pib: string;
    kd_jenis_impor: string;
    kd_bc: string | null;
    tgl_bc: string | null;
    nomor_bc: string;
    pos_bc: string;
    sub_pos_bc: string;
    sub_sub_pos_bc: string;
    kode_pembayar: string;
    kd_pengajuan: string | null;
    dok_asal: string | null;
    jenis_transaksi: string | null;
    kategori_transaksi: string | null;
    tujuan_transaksi: string | null;
    asal_barang: string | null;
    kategori_barang: string | null;
    kd_pabean_bongkar: string | null;
    jenis_tpb: string | null;
    kode_kena_pajak: string | null;
    tgl_ttd: string | null;
    ur_pabean_asal: string;
    ur_pabean_pengawas: string;
    ur_jenis_ekspor: string;
    ur_kategori_ekspor: string;
    ur_transaksi: string | null;
    ur_cara_bayar: string;
    ur_cara_dagang: string | null;
    ur_dokumen_penutup: string | null;
    ur_jenis_pib: string;
    ur_jenis_impor: string;
    ur_transaksi_impor: string;
    ur_pabean_bongkar: string;
    ur_jenis_tpb: string | null;
    ur_transaksi_ftz: string | null;
    ur_kena_pajak: string | null;
};

type IdentitasData = {
    kd_entitas: string;
    nib: string;
    nipu: string | null;
    tanggal_nipu: string | null;
    jenis_api: string | null;
    nomor_api: string | null;
    kd_identitas: string;
    ur_jenis_identitas: string;
    length_col: number | null;
    id_entitas: string;
    id_aju: string;
    nomor_identitas: string;
    alamat_identitas: string;
    pelaku_usaha: string | null;
    kd_status: string | null;
    status: string | null;
    kd_negara: string;
    ur_negara: string;
    nama_identitas: string;
    kota_identitas: string | null;
    ur_kota: string | null;
    kecamatan: string | null;
    rt_rw: string | null;
    kode_pos: string | null;
    tlp_identitas: string | null;
    email_identitas: string | null;
    kd_entitas_pemberitahu: number;
    ur_entitas: string;
    id_dokumen: string;
    to_order: string | null;
    jabatan_identitas: string | null;
    np_ppjk: string | null;
    tgl_nppjk: string | null;
    onbehalf: string | null;
    flag: boolean | null;
    provinsi_identitas: string | null;
    ur_provinsi_identitas: string | null;
    kegiatan_ke: number;
    no_identitas_16: string | null;
    status_pemilik: string | null;
    uraian_status_pemilik: string | null;
};
  
export type DataEntitasProp = {
    user_portal: string;
    npwp_pengaju: string;
    kd_entitas_pemberitahu: number;
    ur_entitas_pemberitahu: string;
    pengusaha: IdentitasData;
    pemusatan: IdentitasData;
    pemilik: IdentitasData;
    pengirim: IdentitasData;
    pemasok: IdentitasData;
    penjual: IdentitasData;
    penanggungjawab: IdentitasData;
    pembeli: IdentitasData;
};
  

export type DataPungutanProp = {
    kd_moda: string | null;
    id_aju: string;
    ur_moda: string | null;
    kd_negara: string | null;
    ur_negara: string | null;
    id_nilai_pabean: string;
    kd_incoterm: string;
    ur_incoterm: string;
    kd_valuta: string;
    ur_valuta: string;
    nilai_kurs: string;
    nilai_incoterm: string;
    biaya_tambahan: string;
    biaya_pengurang: string;
    tarif_vd: string;
    flag_vd: boolean;
    kd_asuransi: string;
    ur_asuransi: string;
    nilai_asuransi: string;
    freight: string;
    nilai_pabean: string;
    total: string;
    nilai_pabean_idr: string;
    nilai_jasa: string;
    potongan_harga: string;
    uang_muka: string;
    kd_jaminan: number;
    ur_jaminan: string | null;
    harga_penyerahan: string;
    flag_curah: string;
    ur_flag_curah: string;
    flag_migas: string | null;
    ur_flag_migas: string | null;
    flag_maklon: string | null;
    nilai_maklon: string;
    fob: string;
    kd_jasa_pajak: string | null;
    ur_jasa_pajak: string | null;
    dn_asuransi: boolean;
    dn_freight: boolean;
    ln_asuransi: boolean;
    ln_freight: boolean;
    berat_bersih: string;
    berat_kotor: string;
    volume: string;
    dataBank: string[];
};

export type Kurs = {
    name: string,
    code: keyof ExchangeRates
};

export const ListKurs : Kurs[] = [
    {name: 'Dollar', code: 'USD'},
    {name: 'Euro', code: 'EUR'},
    {name: 'Singapore Dollar', code: 'SGD'}
];

export type ExchangeRates = {
    IDR: number;
    EUR: number;
    USD: number;
    SGD: number;
};

export type ConversionRates = {
    conversion_rates: ExchangeRates;
};

export type DataUtamaReport = {
    nomor_pengajuan: string;
    nomor_pendaftaran: string;
    tanggal_pendaftaran: string;
    npwp_pengaju: string;
    ur_entitas_pemberitahu: string;
    nilai_fob: number;
    nilai_cif: number;
    cif_in_rp:number;
    voluntaryDeclaration: number;
    valuta_code: string;
}
  
  